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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userEmail` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profileImage` varchar(255) DEFAULT NULL,
  `provider` enum('GOOGLE','FACEBOOK','GITHUB','NAVER','KAKAO') DEFAULT NULL,
  `refreshToken` varchar(255) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('dudrb5260@naver.com',NULL,'https://phinf.pstatic.net/contact/20221217_55/1671218192228G7xOB_JPEG/KakaoTalk_20220517_214923874.jpg','NAVER','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkdWRyYjUyNjBAbmF2ZXIuY29tIiwiaWF0IjoxNzA3OTc1NjUyLCJwcm92aWRlciI6Ik5BVkVSIiwiZXhwIjoxNzA4MDYyMDUyfQ.YZG_fGEm8u-m4u_Ma1Xsl9dGQtk2f5wVXn5ebVWZVGR8WCAtyK_5sSXpuQKW8xpB2BvwDLE6guGBCxd1wpb4kA','박영규'),('jungyoanwoo@naver.com',NULL,'https://getidea-s3.s3.ap-northeast-2.amazonaws.com/profileImage/jungyoanwoo%40naver.com','KAKAO','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdW5neW9hbndvb0BuYXZlci5jb20iLCJpYXQiOjE3MDgwMDI2NTUsInByb3ZpZGVyIjoiS0FLQU8iLCJleHAiOjE3MDgwODkwNTV9.XnYFgMfci2G2YHFSjQtd83JhmdKBltXljDHTXv8IjH4iAyFyg_pntX07E1C0reVCzD4wgUp18efBydvQFuiHXA','연우'),('kkkbs41@daum.net',NULL,'https://getidea-s3.s3.ap-northeast-2.amazonaws.com/profileImage/kkkbs41%40daum.net','KAKAO','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJra2ticzQxQGRhdW0ubmV0IiwiaWF0IjoxNzA3OTk5MjgxLCJwcm92aWRlciI6IktBS0FPIiwiZXhwIjoxNzA4MDg1NjgxfQ.VqAlVw_PPjZbdo6FqkqRERfb03MGiuDyLR81s4bp8JBvvikKPKdv1U5_KNZPzxeTXuTWZtWcSLYBjiBvkHMbyw','김범수'),('lhs2689@naver.com',NULL,'http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','KAKAO','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsaHMyNjg5QG5hdmVyLmNvbSIsImlhdCI6MTcwNzk1ODk5NSwicHJvdmlkZXIiOiJLQUtBTyIsImV4cCI6MTcwODA0NTM5NX0.ICy-AJC_3LLDkkh-3BYTc0SQeb4PyMYy3jGC1dwl9WeFPof5KEsweYXvE16tsIbkH1gghf5FqSoDmCwU48bFiQ','현승'),('lju0514@naver.com',NULL,'http://k.kakaocdn.net/dn/bqM1nb/btsyQLpBWWH/ukoPdziLCPzjeCw1zinlNk/img_640x640.jpg','KAKAO','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsanUwNTE0QG5hdmVyLmNvbSIsImlhdCI6MTcwNzg3NDkwMCwicHJvdmlkZXIiOiJLQUtBTyIsImV4cCI6MTcwNzk2MTMwMH0.b_cQ1swdVrHSiqTE7chJWI-0BkHGQfSYjAO9TbsP3LibJwfDQrrxde26wRo2hjh59EjrG_uA2oH0luBKndFp1g','이지은'),('pmsd41@gmail.com',NULL,'https://lh3.googleusercontent.com/a/ACg8ocKhOOjJmim-bJUPvzX2w_P8ikWC8DIjoNakYoN7CbVO=s96-c','GOOGLE','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwbXNkNDFAZ21haWwuY29tIiwiaWF0IjoxNzA3ODk2NzU5LCJwcm92aWRlciI6IkdPT0dMRSIsImV4cCI6MTcwNzk4MzE1OX0.tBU7DxipdQRP1CLVlD6rS9SAvwjABbqM3HD8YQO_h_d6-7uqDbTf_ChE16WLAzLL0EFUYtJpBQhCC_ZFKuAWyg','김범수'),('rkdiddudrb@naver.com',NULL,'http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','KAKAO','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJya2RpZGR1ZHJiQG5hdmVyLmNvbSIsImlhdCI6MTcwNzk4NjA0NSwicHJvdmlkZXIiOiJLQUtBTyIsImV4cCI6MTcwODA3MjQ0NX0.0Zpnvl66D32UL8y7DiDGBIWU5tgum6EC53WwFMJRVKiSOQhlhJf_nxFojSNstoAAlyFDOou27fBx8Y3oURtt7Q','박영규'),('wnsrb933@nate.com',NULL,'http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','KAKAO','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3bnNyYjkzM0BuYXRlLmNvbSIsImlhdCI6MTcwODAwMjg4OSwicHJvdmlkZXIiOiJLQUtBTyIsImV4cCI6MTcwODA4OTI4OX0.EsDY774xwjgtcstRNKKWcIqTCZF00yMXO-x-j2S_iiqSaHmqjbddeJWHxBxh3foTsi78-nHJS70SS9DlWEFFmA','강준규'),('wnsrb933@naver.com',NULL,'https://ssl.pstatic.net/static/pwe/address/img_profile.png','NAVER','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3bnNyYjkzM0BuYXZlci5jb20iLCJpYXQiOjE3MDc5NzU3ODMsInByb3ZpZGVyIjoiTkFWRVIiLCJleHAiOjE3MDgwNjIxODN9.Ab4Nf9BGuZV5l7aVO1qyRRQHYjDoIvBBNg3JJiYXj6v6Ssb07IE52tWcV9-oztS2u2u_i_QFsMAsIZtY9Fm7CQ','강준규'),('yoanwoo@jr.naver.com',NULL,'https://ssl.pstatic.net/static/pwe/address/img_profile.png','NAVER','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5b2Fud29vQGpyLm5hdmVyLmNvbSIsImlhdCI6MTcwNzk4NjE4OCwicHJvdmlkZXIiOiJOQVZFUiIsImV4cCI6MTcwODA3MjU4OH0.qD0Ef9_0E5Ex0RQVFP6w4NlUvyJEBhYACru4dlnv9XQFnnEsUrwYpMGLjx-Z3FM__leQqwp9_Ygl2DU6E2x5Bg','정연우'),('ys0403ab@gmail.com',NULL,'http://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_640x640.jpg','KAKAO','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5czA0MDNhYkBnbWFpbC5jb20iLCJpYXQiOjE3MDc5OTYyODcsInByb3ZpZGVyIjoiS0FLQU8iLCJleHAiOjE3MDgwODI2ODd9.uc3bz0TKtkStv3FZGzp0cXzHhnjOdb2jjdPkZRgOduCtl8I8R2DsB_KeO04CJfZKDkBKJJbpgn0mYZkgyrzcjw','유호정');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-15 23:45:27
