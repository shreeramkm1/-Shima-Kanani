-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: blood_database
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `DonationEvent`
--

DROP TABLE IF EXISTS `DonationEvent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DonationEvent` (
  `donationEventID` int(11) NOT NULL,
  `fk_eventID` int(11) NOT NULL,
  `eventDate` date NOT NULL,
  `openTime` time NOT NULL,
  `closeTime` time NOT NULL,
  `eventName` varchar(32) NOT NULL,
  `fk_locationID` int(11) NOT NULL,
  PRIMARY KEY (`donationEventID`),
  KEY `fk_locationID` (`fk_locationID`),
  KEY `fk_eventID` (`fk_eventID`),
  CONSTRAINT `donationevent_ibfk_1` FOREIGN KEY (`fk_locationID`) REFERENCES `LocationInformation` (`locationID`),
  CONSTRAINT `donationevent_ibfk_2` FOREIGN KEY (`fk_eventID`) REFERENCES `BloodEvent` (`eventID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DonationEvent`
--

LOCK TABLES `DonationEvent` WRITE;
/*!40000 ALTER TABLE `DonationEvent` DISABLE KEYS */;
INSERT INTO `DonationEvent` VALUES (1,1,'2017-07-13','08:00:00','20:00:00','name1',2),(2,2,'2017-04-22','08:00:00','20:00:00','name2',3),(3,3,'2017-03-12','08:00:00','20:00:00','name3',1),(4,4,'2017-07-13','08:00:00','20:00:00','name4',2),(5,5,'2017-04-22','08:00:00','20:00:00','name5',3),(6,6,'2017-03-12','08:00:00','20:00:00','name6',1),(7,7,'2017-07-13','08:00:00','20:00:00','name7',2),(8,8,'2017-04-22','08:00:00','20:00:00','name8',3),(9,9,'2017-03-12','08:00:00','20:00:00','name9',1);
/*!40000 ALTER TABLE `DonationEvent` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-06 17:52:29
