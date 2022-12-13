--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` char(255) DEFAULT NULL,
  `pageId` int DEFAULT NULL,
  `public` int DEFAULT '0',
  `deleted` int DEFAULT '0',
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `pageId` (`pageId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `emailLog`
--

DROP TABLE IF EXISTS `emailLog`;
CREATE TABLE `emailLog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `from` char(255) DEFAULT NULL,
  `to` text,
  `subject` text,
  `body` text,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pageId` int DEFAULT NULL,
  `type` char(20) DEFAULT NULL,
  `sort` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `page`
--

DROP TABLE IF EXISTS `page`;
CREATE TABLE `page` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` text,
  `name` char(255) DEFAULT NULL,
  `title` text,
  `keywords` text,
  `description` text,
  `modules` text,
  `public` int DEFAULT '0',
  `locked` int DEFAULT '0',
  `parent` int DEFAULT '0',
  `locationExt` text,
  `config` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


--
-- Dumping data for table `page`
--

LOCK TABLES `page` WRITE;
/*!40000 ALTER TABLE `page` DISABLE KEYS */;
INSERT INTO `page` VALUES (1,'/','Главная','','','','[]',1,0,0,'[]',NULL);
/*!40000 ALTER TABLE `page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pageMeta`
--

DROP TABLE IF EXISTS `pageMeta`;
CREATE TABLE `pageMeta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pageId` int DEFAULT NULL,
  `articleId` int DEFAULT NULL,
  `title` text,
  `keywords` text,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pageId` (`pageId`,`articleId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pageMeta`
--

LOCK TABLES `pageMeta` WRITE;
/*!40000 ALTER TABLE `pageMeta` DISABLE KEYS */;
INSERT INTO `pageMeta` VALUES (1,1,0,'','','');
/*!40000 ALTER TABLE `pageMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `text`
--

DROP TABLE IF EXISTS `text`;
CREATE TABLE `text` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` longtext,
  `position` char(255) DEFAULT NULL,
  `type` enum('page','site') DEFAULT 'page',
  `pageId` int DEFAULT '0',
  `articleId` int DEFAULT '0',
  `intValue` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(255) DEFAULT NULL,
  `password` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1, 'root', md5('123123'));
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;