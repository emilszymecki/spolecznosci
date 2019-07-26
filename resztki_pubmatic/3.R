domains <- y %>% filter( !(domain %in% DomainsAll$`Domain/App Store URL`) ) %>% select(prebid,domain,md) %>% distinct() %>% rename(`Site URL` = prebid,`Domain/App Store URL` = domain,`Platform (Web/Mobile Web/Mobile App iOS/Mobile App Android)` = md) %>% mutate(
  `App Domain` = "",
  `Primary Category` = "IAB1",
  `Secondary Categories (Only if Publisher is IAB enabled)` =  "",
  `Site Code (optional)` = "",
  `App Name` = "",
  `App ID` = 0,
  `Bundle ID` = "",
  `App IAB Category` = "Bed & Breakfasts",
  `Status` = "Approved",
  `Description` = ""
)

domains <- domains[,c(1,2,4:6,3,7:13)]

write.csv2(domains,"domains.csv",fileEncoding="UTF-8")