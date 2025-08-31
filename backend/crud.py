def validate_and_normalize_cik(cik: str) -> str:
    """
    Validate and normalize a CIK number.
    """
    ## strip away leading 0s
    cik = cik.strip().lstrip("0")
    if not cik.isdigit():
        raise ValueError("CIK must be a number. Please check the CIK and try again.")

    # TODO: check if CIK exists in EDGAR: https://www.sec.gov/Archives/edgar/cik-lookup-data.txt

    return cik
