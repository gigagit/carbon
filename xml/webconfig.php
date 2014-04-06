<?php 
if(empty($_SERVER['HTTP_X_REQUESTED_WITH'])) {
  die("");
}
else {
?>
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <launch-date-time>01 Aug 2014, 11:00:00</launch-date-time>
  <progress-status-percentage>40%</progress-status-percentage>
  <email-for-queries>support@gigagit.com</email-for-queries>
  <facebook-page>https://www.facebook.com/gigagit</facebook-page>
  <twitter-page>https://twitter.com/gigagit</twitter-page>
</configuration>
<?php
}
?>