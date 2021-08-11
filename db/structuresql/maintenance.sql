SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
-- ----------------------------
-- Table structure for maintenance
-- ----------------------------
DROP TABLE IF EXISTS `maintenance`;
CREATE TABLE `maintenance` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `android_version` varchar(255) NOT NULL,
    `ios_version` varchar(255) DEFAULT NULL,
    `is_maintenance` tinyint(1) DEFAULT NULL,
    `tanggal_perubahan` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = latin1;
-- ----------------------------
-- Records of maintenance
-- ----------------------------
BEGIN;
INSERT INTO `maintenance`
VALUES (1, '1.0.0', '1.0.0', 0, '2021-08-11 11:38:39');
COMMIT;
SET FOREIGN_KEY_CHECKS = 1;