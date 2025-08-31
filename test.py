import requests

# Your accession number
accession_no = "0001752724-25-211156" # Replace with your target accession number
#               0001752724-25-211156

# --- 1. Deconstruct the accession number ---
cik_raw = accession_no.split('-') # e.g., "0001234567"
cik_for_url = cik_raw.lstrip('0') # CIK for direct file URL, e.g., "1234567"
cik_for_submissions_api = cik_raw.zfill(10) # CIK padded for submissions API, e.g., "0000012345"
accession_no_formatted = accession_no.replace('-', '') # e.g., "000123456725012345"

# --- 2. Fetch the company's submission data ---
headers = {'User-Agent': 'YourName YourEmail@example.com'} # Replace with your actual name and email
response = requests.get(f"https://data.sec.gov/submissions/CIK{cik_for_submissions_api}.json", headers=headers)

if response.status_code == 200:
    data = response.json()

    # --- 3. Find the primary document name ---
    filings = data['filings']['recent']
    primary_doc_name = ""

    for i, acc_num_in_list in enumerate(filings['accessionNumber']):
        if acc_num_in_list == accession_no:
            primary_doc_name = filings['primaryDocument'][i]
            break

    # --- 4. Build and print the final URL ---
    if primary_doc_name:
        file_url = f"https://www.sec.gov/Archives/edgar/data/{cik_for_url}/{accession_no_formatted}/{primary_doc_name}"
        print(f"✅ Your file URL is: {file_url}")
    else:
        print(f"❌ Filing with accession number {accession_no} not found in recent submissions for CIK {cik_for_submissions_api}.")
else:
    print(f"❌ Failed to fetch company submission data. Status code: {response.status_code}")

