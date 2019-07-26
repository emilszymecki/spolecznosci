splDigNum <- function(str){
  spl <- str_split_fixed(str, "_", 5)
  lst <- strsplit(spl[2], "(?=[A-Za-z])(?<=[0-9])|(?=[0-9])(?<=[A-Za-z])", perl=TRUE)
  lst <- unlist(lst) 
  if(length(lst) > 1){
    return ( (glue('{spl[1]}_{lst[1]}_ROS_{lst[2]}_{spl[4]}')) )
  }
  else{
    return(str)
  }
}

newName <- function(str){
  spl <- str_split_fixed(str, "_", 5)
  if(nchar(spl[5]) == 0){
    return ( tolower(glue('{spl[1]}_{spl[2]}_ROS_1_{spl[4]}')) )
  }
  else{
    return(tolower(str))
  }
}
testtag <- AdTagAll
testtag$`Ad Tag Name` <- lapply(AdTagAll$`Ad.Tag.Name`,splDigNum)
#testtag$`Ad Tag Name` <- lapply(pre_testtag$`Ad.Tag.Name`,newName)

#testtag$`Ad Tag Name` <- lapply(AdTagAll$`Ad Tag Name`,newName)

#tagsTemp <- y %>% filter( !( tolower(glue) %in% testtag$`Ad Tag Name`))  %>% select(glue,placement,crm) %>% distinct()

tags <- y %>% filter( !( tolower(glue) %in% testtag$`Ad Tag Name`)) %>% select(glue,prebid,sizeName) %>% distinct() %>% rename(`Site/App Identifier` = prebid,`Ad Tag Name` = glue,`Ad Size` = sizeName) %>% mutate(
  `Ad Tag ID` = "",
  `Format Type` = "TEXT_AND_IMAGE",
  `Response Code` = "JAVASCRIPT",
  `Ad Placement` = "NOT_SURE",
  `Fold Placement` = "UNKNOWN",
  `Expansion Direction` = "UNKNOWN",
  `User Data Parameters (Semicolon Separated List of key=value)` = "kadpageurl",
  `Protocol (VAST 2.0/VAST 3.0)(Applicable in case of Video)` = "" ,
  `VPAID Support (Applicable in case of Video)` = "" ,
  `Time Range Min (Applicable in case of Video)` = "" ,
  `Time Range Max (Applicable in case of Video)` = "" ,
  `MIME Type (Semicolon Separated List)(Applicable in case of Video)` = "" ,
  `Default Player Size (WidthxHeight for static size/Dynamic or blank for dynamic size)(Applicable in case of Video)` = "" ,
  `Placement Type (Applicable in case of Video)` = "" ,
  `Linear Ad (Any/Linear/Non-Linear)(Applicable in case of Video and placement type is In-stream)` = "" ,
  `Positioning (Pre-roll/Mid-roll/Post-roll)(Applicable in case of Video and placement type is In-stream)` = "" ,
  `Playback Method (Semicolon Separated List)(Applicable in case of Video)` = "" ,
  `Skippable Ad (Y/N) (Applicable in case of Video)` = "" ,
  `Skippable after seconds (Applicable in case of Video and Skippable Ad is Y)` = "" ,
  `Max Bitrate (Applicable in case of Video)` = "" ,
  `Companion Ad (Y/N) (Applicable in case of Video)` = "" ,
  `Companion Adsize (Width x Height in case of Companion Ad is true)(Applicable in case of Video)` = "" ,
  `Video AdServer Name (Applicable in case of Video)` = "" ,
  `Video Player Name (Applicable in case of Video)` = "" ,
  `Delete Ad Tag (Y/N)` = "N"
)

tags <- tags[,c(4,1,2,5,6,3,7:28)]


write.csv2(tags,"tags.csv",fileEncoding="UTF-8")
