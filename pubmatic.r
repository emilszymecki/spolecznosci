library(tidyverse)
library(glue)
#df <- data.frame(matrix(ncol = 19, nrow = 0))
namesSite <- c("Site ID (Should be blank for New Sites)","Site/App Domain","Site/App Identifier","Platform","Primary Vertical or Category","Secondary Vertical or Category(Semi-Colon Separated List; maximum 3 categories supported)","Monthly Ad Impressions","Privacy Policy URL","Is Default Site(Y/N)","API Setting Enabled(Y/N)","COPPA Compliant(Y/N)","Rich Media Compliance in case of App(Semi-Colon Separated List)","Override Publisher Data in case of App(Y/N)","Availablity on App Store(Y/N)","AppStore URL","Is Secure Site(Y/N)","Decision Manager Type(None/Premium/Standard)","Delete Site(Y/N)","Comments (Indicates Failure Reasons)")
namesPlacement <- c('Ad Tag ID','Ad Tag Name','Site/App Identifier','Format Type','Response Code','Ad Size','Ad Placement','Fold Placement','Expansion Direction','User Data Parameters (Semicolon Separated List of key=value)','Protocol (VAST 2.0/VAST 3.0)(Applicable in case of Video)','VPAID Support (Applicable in case of Video)','Time Range Min (Applicable in case of Video)','Time Range Max (Applicable in case of Video)','MIME Type (Semicolon Separated List)(Applicable in case of Video)','Default Player Size (WidthxHeight for static size/Dynamic or blank for dynamic size)(Applicable in case of Video)','Companion Ad (Y/N) (Applicable in case of Video)','Linear Ad (Any/Linear/Non-Linear)(Applicable in case of Video)','Positioning (Pre-roll/In-roll/Post-roll)(Applicable in case of Video)','Delete Ad Tag (Y/N)')
#colnames(df) <- namesSite

createHTTP <- function(str){glue('https://{gsub("^m.","",tolower(str))}')}
createHTTP_Prebid_WEB <- function(str){glue('{createHTTP(str)}/Prebid')}
createHTTP_Prebid_MOBILE <- function(str){glue('{tolower(str)}/Prebid')}

looperSite <- function(vector){
    df <- data.frame(matrix(ncol = 19, nrow = 0))  
    #namesSite <- c("Site ID (Should be blank for New Sites)","Site/App Domain","Site/App Identifier","Platform","Primary Vertical or Category","Secondary Vertical or Category(Semi-Colon Separated List; maximum 3 categories supported)","Monthly Ad Impressions","Privacy Policy URL","Is Default Site(Y/N)","API Setting Enabled(Y/N)","COPPA Compliant(Y/N)","Rich Media Compliance in case of App(Semi-Colon Separated List)","Override Publisher Data in case of App(Y/N)","Availablity on App Store(Y/N)","AppStore URL","Is Secure Site(Y/N)","Decision Manager Type(None/Premium/Standard)","Delete Site(Y/N)","Comments (Indicates Failure Reasons)")
    
    for(i in 1:length(vector)){
    	MoD <- MobileOrDesktop(vector[i])
        df[nrow(df)+1,] <- c("",createHTTP(vector[i]),MoD[2],MoD[1],"Arts & Entertainment","","10000","","N","Y","N","","","","","N","STANDARD","N","")
    }
    
    colnames(df) <- namesSite
    return (df)
}

Doublebillboard <- c("Doublebillboard","750x200","750x200 (750x200)")
Halfpage <- c("Halfpage","300x600","300x600 (300x600 - Filmstrip)")
Rectangle <- c("Rectangle","300x250","300x250 (300x250 - Sidekick)")
Skyscrape <- c("Skyscraper","160x600","160x600 (160x600 - Wide Skyscraper)")

placementTypes <- rbind(Doublebillboard,Halfpage,Rectangle,Skyscrape)

splitNumDigit <- function(str){
     lst <- strsplit(str, "(?=[A-Za-z])(?<=[0-9])|(?=[0-9])(?<=[A-Za-z])", perl=TRUE)
    return(lst)
}

betterName <- function(x){
    spliter <- strsplit(x,"_")
    name <- spliter[[1]][1]
    ros <- spliter[[1]][2]
    typeAll <- spliter[[1]][3]
    numDig <- splitNumDigit(typeAll)
    type <- numDig[[1]][1]
    dig  <- numDig[[1]][2]
    return(c(name,ros,typeAll,type,dig))
}


createNames <- function(str){
    parts <- betterName(str)
    checkSize <- placementTypes[paste(parts[4]),]
    ADTN <- glue('{parts[1]}_{checkSize[1]}_{parts[2]}_{parts[5]}_{checkSize[2]}')
    return(c(ADTN,checkSize[3]))
}

MobileOrDesktop <- function(str){
    test <- startsWith( str, 'm.')
    if(test){
        return(c("Mobile Web",createHTTP_Prebid_MOBILE(str)))
    }else{
        return(c("Web",createHTTP_Prebid_WEB(str)))
    }
}

onlyServiceName <- function(csv){
    return(unique(do.call( rbind, (strsplit(as.vector(csv[,1]),"_")))[,1]))
 }

looperPlacement <- function(vector){
    df <- data.frame(matrix(ncol = 20, nrow = 0))  
    #namesSite <- c("Site ID (Should be blank for New Sites)","Site/App Domain","Site/App Identifier","Platform","Primary Vertical or Category","Secondary Vertical or Category(Semi-Colon Separated List; maximum 3 categories supported)","Monthly Ad Impressions","Privacy Policy URL","Is Default Site(Y/N)","API Setting Enabled(Y/N)","COPPA Compliant(Y/N)","Rich Media Compliance in case of App(Semi-Colon Separated List)","Override Publisher Data in case of App(Y/N)","Availablity on App Store(Y/N)","AppStore URL","Is Secure Site(Y/N)","Decision Manager Type(None/Premium/Standard)","Delete Site(Y/N)","Comments (Indicates Failure Reasons)")
    
    for(i in 1:length(vector)){
    	MoD <- MobileOrDesktop(vector[i])
    	Names <- createNames(vector[i])
    	onlySiteName <- MobileOrDesktop(betterName(vector[i])[1])[2]
        df[nrow(df)+1,] <- c("",Names[1],onlySiteName,"TEXT_AND_IMAGE","JAVASCRIPT",Names[2],"NOT_SURE","UNKNOWN","UNKNOWN","kadpageurl","","","","","","","","","","N")
    }
    
    colnames(df) <- namesPlacement
    return (df)
}

servicesNames <- onlyServiceName(test)
placementsNames<- as.vector(unlist(test))
dfSites <- looperSite(servicesNames)
dfPlacements <- looperPlacement(placementsNames)

write.csv(dfSites, file = "sites.csv",row.names=FALSE, na="")
write.csv(dfPlacements, file = "placements.csv",row.names=FALSE, na="")
