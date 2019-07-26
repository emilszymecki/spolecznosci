SitesAll <- SitesAll %>% mutate(domain = str_replace(`Site.App.Domain`,"^(http|https)(://)",""))

sites <- y %>% filter( !(domain %in% SitesAll$domain) ) %>% select(http,prebid,md) %>% distinct() %>% mutate(
  `Primary Vertical or Category` = "Arts & Entertainment",
  `Secondary Vertical or Category(Semi-Colon Separated List; maximum 3 categories supported)` = '',
  `Monthly Ad Impressions` = 10000,
  `Privacy Policy URL` = "",
  `Is Default Site(Y/N)` = "N",
  `API Setting Enabled(Y/N)` = "Y",
  `COPPA Compliant(Y/N)` = "N",
  `Rich Media Compliance in case of App(Semi-Colon Separated List)` = "",
  `Override Publisher Data in case of App(Y/N)` = "",
  `Availablity on App Store(Y/N)` = "",
  `AppStore URL` = "",
  `Is Secure Site(Y/N)` = "N",
  `Decision Manager Type(None/Premium/Standard)` = "STANDARD",
  `Delete Site(Y/N)` = "N",
  `Comments (Indicates Failure Reasons)` = "",
  `Site ID (Should be blank for New Sites)` = ""
) %>% rename(`Site/App Domain` = http,`Site/App Identifier` = prebid,`Platform` = md)

sites <- sites[,c(19,1:18)]

write.csv2(sites,"sites.csv",fileEncoding="UTF-8")
