import parsedatetime

def suffix(d):
  return "th" if 11 <= d <= 13 else {1: "st", 2: "nd", 3: "rd"}.get(d % 10, "th")


def custom_strftime(fmt, t):
  return t.strftime(fmt).replace("{S}", str(t.day) + suffix(t.day))


def date_roam_formatter(date):
  # Convert Fuzzy Date to standard format.
  p = parsedatetime.parse(date)
  # Convert to Roam date format.
  