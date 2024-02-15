-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: i10b104.p.ssafy.io    Database: gimysql
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `locationId` bigint NOT NULL AUTO_INCREMENT,
  `authority` bit(1) DEFAULT NULL,
  `bookmark` bit(1) DEFAULT NULL,
  `folderName` varchar(255) DEFAULT NULL,
  `projectId` bigint DEFAULT NULL,
  `projectName` varchar(255) DEFAULT NULL,
  `userEmail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`locationId`)
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (39,_binary '\0',_binary '\0','GetIdeaMain',1,'test','kkkbs41@daum.net'),(40,_binary '\0',_binary '','fTest',2,'fTest2','kkkbs41@daum.net'),(41,_binary '\0',_binary '\0','GetIdeaMain',3,'btest','kkkbs41@daum.net'),(42,_binary '\0',_binary '\0','GetIdeaMain',4,'6test','kkkbs41@daum.net'),(43,_binary '\0',_binary '','GetIdeaMain',5,'7c','kkkbs41@daum.net'),(44,_binary '\0',_binary '\0','GetIdeaMain',6,'chat','jungyoanwoo@naver.com'),(45,_binary '\0',_binary '\0','GetIdeaMain',7,'test','jungyoanwoo@naver.com'),(46,_binary '\0',_binary '\0','GetIdeaMain',8,'7check','jungyoanwoo@naver.com'),(47,_binary '\0',_binary '\0','GetIdeaMain',9,'whiteboard','jungyoanwoo@naver.com'),(50,_binary '\0',_binary '','폴더1',11,'프로젝트 이미지','jungyoanwoo@naver.com'),(51,_binary '\0',_binary '\0','GetIdeaMain',12,'ㅋㅋㅋㅋ','jungyoanwoo@naver.com'),(52,_binary '\0',_binary '\0','GetIdeaMain',13,'ㅋㅋㅋㅋㅋㅋㅋㅋ','jungyoanwoo@naver.com'),(53,_binary '\0',_binary '\0','GetIdeaMain',14,'gd','jungyoanwoo@naver.com'),(54,_binary '\0',_binary '\0','GetIdeaMain',15,'화이트보드','jungyoanwoo@naver.com'),(55,_binary '\0',_binary '\0','GetIdeaMain',16,'7첵','jungyoanwoo@naver.com'),(56,_binary '\0',_binary '\0','GetIdeaMain',17,'6생모','jungyoanwoo@naver.com'),(57,_binary '\0',_binary '\0','GetIdeaMain',18,'아이디어말풍선선선선','jungyoanwoo@naver.com'),(58,_binary '\0',_binary '','GetIdeaMain',19,'화이트보드보드','jungyoanwoo@naver.com'),(59,_binary '\0',_binary '\0','GetIdeaMain',20,'6생','jungyoanwoo@naver.com'),(60,_binary '\0',_binary '\0','GetIdeaMain',21,'화이트보드보드보','jungyoanwoo@naver.com'),(61,_binary '\0',_binary '\0','GetIdeaMain',22,'ㅇㄹㅇㄹㅇㄹㅇㄹ','jungyoanwoo@naver.com'),(62,_binary '\0',_binary '','GetIdeaMain',23,'ddd','jungyoanwoo@naver.com'),(63,_binary '\0',_binary '\0','GetIdeaMain',24,'zzzzzz','jungyoanwoo@naver.com'),(65,_binary '\0',_binary '\0','GetIdeaMain',26,'hats','lju0514@naver.com'),(66,_binary '\0',_binary '\0','GetIdeaMain',27,'dea-hat','lju0514@naver.com'),(67,_binary '\0',_binary '\0','GetIdeaMain',28,'화이트','jungyoanwoo@naver.com'),(69,_binary '\0',_binary '\0','GetIdeaMain',30,'강준규','wnsrb933@nate.com'),(70,_binary '\0',_binary '\0','폴더2',31,'228','jungyoanwoo@naver.com'),(71,_binary '\0',_binary '\0','GetIdeaMain',32,'가나다라마바사','jungyoanwoo@naver.com'),(72,_binary '\0',_binary '\0','GetIdeaMain',33,'아하','jungyoanwoo@naver.com'),(75,_binary '\0',_binary '\0','GetIdeaMain',35,'test','wnsrb933@nate.com'),(76,_binary '\0',_binary '\0','GetIdeaMain',36,'이건진짜다','wnsrb933@nate.com'),(86,_binary '\0',_binary '\0','GetIdeaMain',29,'ㅋㅋㅋㅋ','wnsrb933@nate.com'),(90,_binary '\0',_binary '','GetIdeaMain',37,'0215','jungyoanwoo@naver.com'),(91,_binary '\0',_binary '\0','GetIdeaMain',11,'프로젝트 이미지','wnsrb933@nate.com'),(92,_binary '\0',_binary '\0','GetIdeaMain',37,'0215','wnsrb933@nate.com'),(93,_binary '\0',_binary '\0','GetIdeaMain',37,'0215','wnsrb933@nate.com'),(94,_binary '\0',_binary '\0','GetIdeaMain',38,'test','wnsrb933@nate.com'),(99,_binary '\0',_binary '\0','GetIdeaMain',2,'fTest2','jungyoanwoo@naver.com'),(100,_binary '\0',_binary '\0','GetIdeaMain',39,'realtest','wnsrb933@nate.com'),(101,_binary '\0',_binary '\0','GetIdeaMain',40,'템플릿2','wnsrb933@nate.com'),(102,_binary '\0',_binary '\0','GetIdeaMain',41,'bzeromo','dudrb5260@naver.com'),(103,_binary '\0',_binary '','GetIdeaMain',42,'good','rkdiddudrb@naver.com'),(104,_binary '\0',_binary '\0','GetIdeaMain',43,'dddd','rkdiddudrb@naver.com'),(105,_binary '\0',_binary '','GetIdeaMain',44,'gg','rkdiddudrb@naver.com'),(106,_binary '\0',_binary '\0','GetIdeaMain',45,'yg5260','rkdiddudrb@naver.com'),(107,_binary '\0',_binary '\0','기깔나는 플젝',46,'ㅇㅇㅇㄹㅇㄹㅇㄹ','rkdiddudrb@naver.com'),(108,_binary '\0',_binary '\0','GetIdeaMain',47,'gfgf','rkdiddudrb@naver.com'),(109,_binary '\0',_binary '\0','GetIdeaMain',48,'holy','rkdiddudrb@naver.com'),(110,_binary '\0',_binary '\0','GetIdeaMain',49,'dhodfkmw','rkdiddudrb@naver.com'),(111,_binary '\0',_binary '\0','GetIdeaMain',50,'dsds','rkdiddudrb@naver.com'),(112,_binary '\0',_binary '\0','GetIdeaMain',51,'zzz','jungyoanwoo@naver.com'),(113,_binary '\0',_binary '\0','GetIdeaMain',52,'6생','jungyoanwoo@naver.com'),(114,_binary '\0',_binary '\0','폴더2',53,'모자','kkkbs41@daum.net'),(115,_binary '\0',_binary '\0','GetIdeaMain',54,'20240215','jungyoanwoo@naver.com'),(116,_binary '\0',_binary '\0','GetIdeaMain',55,'7777','jungyoanwoo@naver.com'),(117,_binary '\0',_binary '\0','GetIdeaMain',56,'12345','kkkbs41@daum.net'),(118,_binary '\0',_binary '\0','GetIdeaMain',57,'채팅 테스트','yoanwoo@jr.naver.com'),(119,_binary '\0',_binary '\0','GetIdeaMain',58,'dd','yoanwoo@jr.naver.com'),(120,_binary '\0',_binary '\0','GetIdeaMain',59,'ㅑㅑ','jungyoanwoo@naver.com'),(121,_binary '\0',_binary '\0','GetIdeaMain',60,'프로젝트','ys0403ab@gmail.com'),(122,_binary '\0',_binary '\0','GetIdeaMain',61,'우와','ys0403ab@gmail.com'),(123,_binary '\0',_binary '\0','GetIdeaMain',62,'test','kkkbs41@daum.net'),(124,_binary '\0',_binary '\0','폴더2',63,'초대테스트','kkkbs41@daum.net'),(125,_binary '\0',_binary '\0','GetIdeaMain',63,'초대테스트','jungyoanwoo@naver.com'),(126,_binary '\0',_binary '\0','GetIdeaMain',64,'6','kkkbs41@daum.net'),(127,_binary '\0',_binary '\0','GetIdeaMain',65,'new pjt','kkkbs41@daum.net'),(128,_binary '\0',_binary '\0','GetIdeaMain',66,'kkk','jungyoanwoo@naver.com'),(129,_binary '\0',_binary '\0','GetIdeaMain',67,'ddi','jungyoanwoo@naver.com'),(130,_binary '\0',_binary '\0','GetIdeaMain',68,'1','kkkbs41@daum.net'),(131,_binary '\0',_binary '\0','GetIdeaMain',69,'ooooo','jungyoanwoo@naver.com');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-15 23:45:26
