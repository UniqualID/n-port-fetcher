from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
from lxml import etree

from crud import validate_and_normalize_cik

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SEC_HEADERS = {
    "User-Agent": "YourName YourEmail@example.com",
    "Accept-Encoding": "gzip, deflate",
}


@app.get("/filers/{cik}/holdings")
def get_latest_holdings(cik: str):
    cik = validate_and_normalize_cik(cik)
    try:
        submissions_url = f"https://data.sec.gov/submissions/CIK{cik.zfill(10)}.json"
        response = requests.get(submissions_url, headers=SEC_HEADERS)
        response.raise_for_status()
        submissions = response.json()
    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 404:
            raise HTTPException(status_code=404, detail=f"CIK {cik} not found.")
        raise HTTPException(
            status_code=500, detail="Failed to fetch data from SEC submissions API."
        )

    accession_number = None
    try:
        recent_filings = submissions["filings"]["recent"]
        accession_idx = recent_filings["form"].index("NPORT-P")
        accession_number = recent_filings["accessionNumber"][accession_idx]
    except (KeyError, IndexError):
        raise HTTPException(
            status_code=404, detail=f"Could not parse filings for CIK {cik}."
        )

    if not accession_number:
        raise HTTPException(
            status_code=404, detail=f"No NPORT-P filings found for CIK {cik}."
        )

    try:
        accession_no_hyphens = accession_number.replace("-", "")
        xml_url = f"https://www.sec.gov/Archives/edgar/data/{cik}/{accession_no_hyphens}/primary_doc.xml"
        xml_response = requests.get(xml_url, headers=SEC_HEADERS)
        xml_response.raise_for_status()

        tree = etree.fromstring(xml_response.content)
        ns = {"ns": tree.nsmap.get(None)}

        holdings = []
        for holding_element in tree.xpath("//ns:invstOrSec", namespaces=ns):
            holdings.append(
                {
                    "name": holding_element.findtext(
                        "ns:name", default="N/A", namespaces=ns
                    ),
                    "cusip": holding_element.findtext(
                        "ns:cusip", default="N/A", namespaces=ns
                    ),
                    "balance": float(
                        holding_element.findtext(
                            "ns:balance", default="0", namespaces=ns
                        )
                    ),
                    "value": float(
                        holding_element.findtext(
                            "ns:valUSD", default="0", namespaces=ns
                        )
                    ),
                }
            )

        return holdings

    except requests.exceptions.RequestException:
        raise HTTPException(
            status_code=503, detail="Failed to download filing document from SEC."
        )
    except etree.XMLSyntaxError:
        raise HTTPException(
            status_code=500, detail="Failed to parse the SEC filing XML."
        )
