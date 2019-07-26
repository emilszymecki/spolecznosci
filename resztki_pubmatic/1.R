library(tidyverse)
library(glue)

Doublebillboard <- c("Doublebillboard","750x200","750x200 (750x200)")
Halfpage <- c("Halfpage","300x600","300x600 (300x600 - Filmstrip)")
Rectangle <- c("Rectangle","300x250","300x250 (300x250 - Sidekick)")
Skyscraper <- c("Skyscraper","160x600","160x600 (160x600 - Wide Skyscraper)")

placementTypes <- rbind(Doublebillboard,Halfpage,Rectangle,Skyscraper)
namesPlacementType <- c("type","size","sizeName")
colnames(placementTypes) <- namesPlacementType


createHTTP <- function(str){return (glue('https://{gsub("^m[.]","",tolower(str))}'))}
createDomain <- function(str){return (glue('{gsub("^m[.]","",tolower(str))}'))}
createHTTP_Prebid_WEB <- function(str){return (glue('{createHTTP(str)}/Prebid')) }
createHTTP_Prebid_MOBILE <- function(str){return (glue('{tolower(str)}/Prebid')) }

MobileOrDesktopHTTP <- function(str){
  test <- startsWith( str, 'm.')
  return (test)
}

test <- read.table("C:/Users/Administrator/Desktop/test.csv", quote="\"", encoding="UTF-8", comment.char="")
x <- as.data.frame(str_split_fixed(test$V1, "_", 3))
y <- x %>% filter(V2 != "",V3 != "")
y <- y %>% mutate(all = V3)
y <- y %>% separate(V3, c("type", "id_type"), sep = "(?=[A-Za-z])(?<=[0-9])|(?=[0-9])(?<=[A-Za-z])")
y <- y %>% mutate( md = ifelse(startsWith( as.character(V1), 'm.'),"Mobile Web","Web"))
y <- y %>% mutate( http = createHTTP(as.character(V1)) )
y <- y %>% mutate( domain = createDomain(as.character(V1)) )
y <- y %>% mutate( prebid = ifelse(MobileOrDesktopHTTP(as.character(V1)), createHTTP_Prebid_MOBILE(as.character(V1)) , createHTTP_Prebid_WEB(as.character(V1))) )
y <- merge(y,placementTypes,by="type")
y <- y %>% mutate( glue = glue('{V1}_{type}_ROS_{id_type}_{size}'))
y <- y %>% mutate( placement = glue('{V1}_{V2}_{all}'))
y <- y %>% mutate( crm = glue('{placement}@{size}'))

write.csv2(y,"all_pubmatic.csv",fileEncoding="UTF-8")