-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: cooking_site
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `name` (`name`),
  KEY `idx_categories_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_likes`
--

DROP TABLE IF EXISTS `comment_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_likes` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `comment_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`),
  UNIQUE KEY `unique_like` (`comment_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comment_likes_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`) ON DELETE CASCADE,
  CONSTRAINT `comment_likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_likes`
--

LOCK TABLES `comment_likes` WRITE;
/*!40000 ALTER TABLE `comment_likes` DISABLE KEYS */;
INSERT INTO `comment_likes` VALUES (77,3,8,'2025-05-24 21:29:20'),(78,2,8,'2025-05-24 21:29:20'),(79,4,6,'2025-05-24 21:29:32'),(80,3,6,'2025-05-24 21:29:33'),(82,4,8,'2025-05-24 21:59:44');
/*!40000 ALTER TABLE `comment_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_text` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `recipe_id` (`recipe_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (2,2,8,'Πολύ ωραία συνταγή!!!','2025-05-24 20:13:13'),(3,2,6,'Συμφωνώ, είναι πολύ ωραία και εύκολη συνταγή!','2025-05-24 20:17:05'),(4,2,8,'Ξαναδοκίμασα την συνταγή και μου βγήκε ακόμα πιο ωραία αυτή την φορά.','2025-05-24 20:29:05'),(5,5,8,'Ωραία και φθηνή λύση για την dubai chocolate !','2025-05-24 20:29:41');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_categories`
--

DROP TABLE IF EXISTS `recipe_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_categories` (
  `recipe_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`recipe_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `recipe_categories_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE,
  CONSTRAINT `recipe_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_categories`
--

LOCK TABLES `recipe_categories` WRITE;
/*!40000 ALTER TABLE `recipe_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `recipe_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `recipe_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `ingredients` text NOT NULL,
  `instructions` text NOT NULL,
  `prep_time` int DEFAULT NULL,
  `difficulty` enum('Easy','Medium','Hard') DEFAULT 'Medium',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image_url` varchar(255) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `categories` json NOT NULL,
  PRIMARY KEY (`recipe_id`),
  KEY `user_id` (`user_id`),
  KEY `idx_recipes_title` (`title`),
  CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (2,8,'Σπαγγέτι Καρμπονάρα','Κλασικό ιταλικό πιάτο ζυμαρικών με αυγά, τυρί, πανσέτα και πιπέρι.','[\"200γρ σπαγγέτι\", \"100γρ πανσέτα\", \"2 μεγάλα αυγά\", \"50γρ τυρί πεκορίνο\", \"50γρ παρμεζάνα\", \"Φρεσκοτριμμένο μαύρο πιπέρι\", \"Αλάτι\"]','[\"Βράζετε μια μεγάλη κατσαρόλα με νερό.\", \"Τηγανίζετε την πανσέτα μέχρι να γίνει τραγανή και χρυσαφένια.\", \"Χτυπάτε τα αυγά σε ένα μπολ, προσθέτετε αλάτι, πιπέρι και τα τυριά.\", \"Βράζετε τα σπαγγέτι, τα στραγγίζετε και τα προσθέτετε στην πανσέτα.\", \"Αποσύρετε από τη φωτιά, προσθέτετε το μείγμα αυγού-τυριού και ανακατεύετε γρήγορα.\", \"Σερβίρετε αμέσως με επιπλέον τυρί και πιπέρι.\"]',25,'Medium','2025-05-24 21:50:27','2025-05-24 22:22:19','https://images.unsplash.com/photo-1504674900247-0877df9cc836',4.5,'[\"Ιταλική\", \"Ζυμαρικά\", \"Γρήγορα Γεύματα\"]'),(3,8,'Κλασικό Μπέργκερ Μοσχαρίσιο','Ζουμερό μπιφτέκι μοσχαρίσιο με φρέσκα υλικά και αφράτο ψωμάκι.','[\"2 μπιφτέκια μοσχαρίσια\", \"2 ψωμάκια για μπέργκερ\", \"Μαρούλι\", \"Φέτες ντομάτας\", \"Τυρί τσένταρ\", \"Κρεμμύδι\", \"Κέτσαπ\", \"Μουστάρδα\", \"Αλάτι & πιπέρι\"]','[\"Αλατοπιπερώνετε τα μπιφτέκια.\", \"Ψήνετε τα μπιφτέκια στη σχάρα ή στο τηγάνι.\", \"Ψήνετε ελαφρώς τα ψωμάκια.\", \"Συναρμολογείτε το μπέργκερ με μαρούλι, ντομάτα, τυρί, κρεμμύδι και σάλτσες.\", \"Σερβίρετε ζεστό με πατάτες ή σαλάτα.\"]',30,'Easy','2025-05-24 21:50:39','2025-05-24 22:22:25','https://images.unsplash.com/photo-1550547660-d9450f859349',5,'[\"Αμερικάνικη\", \"Μπέργκερ\", \"BBQ\"]'),(4,8,'Πράσινο Ταϊλανδέζικο Κάρυ','Αρωματικό ταϊλανδέζικο κάρυ με γάλα καρύδας, κοτόπουλο και φρέσκα μυρωδικά.','[\"400γρ φιλέτο κοτόπουλο\", \"2 κ.σ. πράσινη πάστα κάρυ\", \"400ml γάλα καρύδας\", \"1 μελιτζάνα\", \"1 κόκκινη πιπεριά τσίλι\", \"Φρέσκος βασιλικός\", \"1 κ.σ. fish sauce\", \"1 κ.γ. ζάχαρη\", \"Λάδι\"]','[\"Ζεσταίνετε το λάδι και σοτάρετε την πάστα κάρυ μέχρι να βγάλει άρωμα.\", \"Προσθέτετε το κοτόπουλο και το σοτάρετε μέχρι να αλλάξει χρώμα.\", \"Ρίχνετε το γάλα καρύδας και αφήνετε να πάρει βράση.\", \"Προσθέτετε μελιτζάνα, πιπεριά, fish sauce και ζάχαρη.\", \"Σιγοβράζετε μέχρι να μαλακώσουν τα λαχανικά.\", \"Γαρνίρετε με βασιλικό και σερβίρετε με ρύζι.\"]',35,'Medium','2025-05-24 21:50:48','2025-05-24 22:22:30','https://images.unsplash.com/photo-1502741338009-cac2772e18bc',4.5,'[\"Ταϊλανδέζικη\", \"Κάρυ\", \"Κοτόπουλο\"]'),(5,8,'Μπάρες παγωτού Dubai chocolate','Παγωμένες μπάρες σοκολάτας με φυστίκι και τραγανή βάση. Ένα δροσερό, εντυπωσιακό γλυκό ψυγείου!','[\"200γρ φυστίκια Αιγίνης\", \"100γρ μπισκότα digestive\", \"80γρ βούτυρο λιωμένο\", \"250γρ κουβερτούρα σοκολάτα\", \"120ml κρέμα γάλακτος\", \"2 κ.σ. μέλι\", \"2 κ.σ. ψιλοκομμένα φυστίκια για γαρνίρισμα\"]','[\"Τρίψε τα μπισκότα και τα φυστίκια στο multi.\", \"Πρόσθεσε το λιωμένο βούτυρο και το μέλι, ανακάτεψε καλά.\", \"Άπλωσε το μείγμα σε φόρμα και βάλε στο ψυγείο.\", \"Λιώσε τη σοκολάτα με την κρέμα γάλακτος και άπλωσέ τη πάνω στη βάση.\", \"Γαρνίρισε με φυστίκια και άφησε στο ψυγείο να σφίξει.\", \"Κόψε σε μπάρες και απόλαυσε!\"]',15,'Easy','2025-05-24 21:50:56','2025-05-24 22:22:34','/ScreenshotDubaiChocolate.webp',5,'[\"Γλυκά\", \"Φυστίκι\", \"Ψυγείου\", \"Γρήγορα Γεύματα\"]'),(6,8,'Μιλφέιγ με παγωτό','Δροσερό μιλφέιγ με παγωτό βανίλια και τραγανή σφολιάτα. Το τέλειο καλοκαιρινό επιδόρπιο!','[\"1 πακέτο φύλλο σφολιάτας\", \"500ml παγωτό βανίλια\", \"200ml κρέμα γάλακτος\", \"50γρ ζάχαρη άχνη\", \"Λίγη βανίλια\", \"Φρέσκα φρούτα για διακόσμηση\"]','[\"Ψήσε τα φύλλα σφολιάτας μέχρι να ροδίσουν.\", \"Χτύπα την κρέμα γάλακτος με τη ζάχαρη άχνη και τη βανίλια.\", \"Κόψε τη σφολιάτα σε κομμάτια.\", \"Στρώσε εναλλάξ σφολιάτα, παγωτό και σαντιγί.\", \"Διακόσμησε με φρούτα και σερβίρισε αμέσως.\"]',20,'Easy','2025-05-24 21:51:03','2025-05-24 23:59:53','/MilfeigIcecream.webp',4.5,'[\"Γλυκά\", \"Γαλλική Κουζίνα\", \"Παγωτά\", \"Γρήγορα Γεύματα\", \"Ψυγείου\"]'),(7,8,'Καραμελωμένα chicken strips','Τραγανά strips κοτόπουλου με γλυκιά καραμελωμένη σάλτσα. Τέλεια για σνακ ή κυρίως πιάτο!','[\"500γρ φιλέτο κοτόπουλο\", \"1 φλ. αλεύρι\", \"2 αυγά\", \"1 φλ. φρυγανιά\", \"2 κ.σ. μέλι\", \"2 κ.σ. σόγια σος\", \"Λάδι για τηγάνισμα\", \"Αλάτι, πιπέρι\"]','[\"Κόψε το κοτόπουλο σε λωρίδες.\", \"Πέρασέ το διαδοχικά από αλεύρι, αυγό και φρυγανιά.\", \"Τηγάνισε μέχρι να ροδίσει.\", \"Σε κατσαρολάκι ζέστανε το μέλι και τη σόγια σος.\", \"Ρίξε τα strips στη σάλτσα και ανακάτεψε.\", \"Σέρβιρε ζεστά.\"]',20,'Easy','2025-05-24 21:51:10','2025-05-24 22:23:43','/ChickenStrips.webp',5,'[\"Μεξικάνικη\", \"Κοτόπουλο\", \"Γρήγορα Γεύματα\"]'),(8,8,'Χοιρινά σουβλάκια BBQ από ψαρονέφρι με smashed potatoes','Ζουμερά χοιρινά σουβλάκια από ψαρονέφρι στη σχάρα, με smashed potatoes και σπιτικές πίτες.','[\"500γρ ψαρονέφρι χοιρινό\", \"Ξυλάκια για σουβλάκι\", \"2 κ.σ. ελαιόλαδο\", \"1 κ.γ. πάπρικα\", \"1 κ.γ. ρίγανη\", \"Αλάτι, πιπέρι\", \"6 πατάτες μέτριες\", \"2 κ.σ. βούτυρο\", \"Σπιτικές πίτες για σερβίρισμα\"]','[\"Κόψε το ψαρονέφρι σε κύβους, μαρινάρισε με λάδι, πάπρικα, ρίγανη, αλάτι, πιπέρι.\", \"Πέρασε τα κομμάτια σε ξυλάκια και ψήσε σε δυνατή σχάρα.\", \"Βράσε τις πατάτες, σπάσ’ τες με πιρούνι, πρόσθεσε βούτυρο, αλάτι, πιπέρι.\", \"Σέρβιρε τα σουβλάκια με τις smashed potatoes και ζεστές πίτες.\"]',45,'Medium','2025-05-24 21:51:18','2025-05-24 22:22:48','/Soublakia.webp',5,'[\"Ελληνική Κουζίνα\", \"Χοιρινό\", \"BBQ\", \"Πατάτες\"]');
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` tinyint(1) DEFAULT '1',
  `profile_picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_users_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'newuser','newuser@test.com','$2b$10$pwy.UTRBF7Wgv1xLROlY2ORWIPuE2Mxvf2sMt1u8jfrf23uh0ygEG','2025-05-17 19:35:10','2025-05-17 19:35:10',1,NULL),(3,'aek21','aek21@aekara.com','$2b$10$FX7.F4cnlV3.zxjbazOAZOf5hvTQqm9mI9ZVJlEi0aMJSqkpsC/mC','2025-05-17 20:36:54','2025-05-17 20:36:54',1,NULL),(4,'Stefanos','stef@stef.com','$2b$10$RZHlupMqyak/BsHHFIJYxuAGrdWgMyPdSH6kRQqht1zbsBBy1QXmO','2025-05-17 21:37:07','2025-05-17 21:37:07',1,NULL),(5,'ole','ole@ole.com','$2b$10$OD8avWa9SDhetSWLeygQKulgjrcnEYypeiEaJ6wph49vhqkdKMaY.','2025-05-18 19:28:09','2025-05-18 19:28:09',1,NULL),(6,'test','test@test.com','$2b$10$BBoBcwlGCvgP8zf.8gaRde..bMukTq95HyHv0YXh6BTAcaS70EVSe','2025-05-24 18:18:44','2025-05-24 18:18:44',1,NULL),(7,'qwerty','qwerty@gmail.com','$2b$10$wj7F2unCUa0Hnu3kthOujuFNkmmT5YD4VqETsDyygV9nSiDrht3q2','2025-05-24 20:55:00','2025-05-24 20:55:00',1,NULL),(8,'admin1','admin@admin.com','$2b$10$5xNMF7RXShExW.6NnM4U9.bR98C5Phisrm51PVwVdgF5CuWKtgc..','2025-05-24 21:49:55','2025-05-24 23:56:17',1,NULL);
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

-- Dump completed on 2025-05-25  1:12:54
