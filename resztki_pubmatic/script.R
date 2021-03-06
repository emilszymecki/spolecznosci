names(sites)[3] <- "Site"
dupa <- merge(tags,sites,by.x = "Site")
newDupa <- dupa %>% select("Ad.Tag.Name","Site.ID","Ad.Tag.ID","Primary.Vertical.or.Category","Site")

splitterName<-function(x){
  str <- unlist(strsplit(as.character(x),"_"))
  return(str_c(str[1:length(str) - 1],sep="",collapse = "_"))
}

splitterResplution<-function(x){
  str <- unlist(strsplit(as.character(x),"_"))
  return(str[length(str)])
}


newDupa$Names <- lapply(newDupa[,1], splitterName)
newDupa$Size <- lapply(newDupa[,1], splitterResplution)
newDupa[paste("Floor within PubMatic")] <- 0
newDupa[paste("Zone ID (Optional - for setting up PMP deals on DM Inventory)")] <- ""

names(newDupa)[1] <- "PubMatic Tag Name"
names(newDupa)[2] <- "PubMatic site"
names(newDupa)[3] <- "PubMatic Ad Tag"
names(newDupa)[4] <- "Remarks"
names(newDupa)[5] <- "PubMatic site_2"

names(newDupa)[6] <- "Ad Unit Name(Spaces not Allowed) List out the ad-unit names which you want to call from Prebid. Or Do you want us to create names for you. Example AdUnit1 or UKROSAD1"

newData <- newDupa %>% select(6,2,3,7,8,9,4,1,5)
newData$Remarks <- tolower(newData$Remarks)

newData <- data.frame(lapply(newData, as.character), stringsAsFactors=FALSE)
write.csv(newData, file = "floor.csv",row.names=FALSE, na="")
