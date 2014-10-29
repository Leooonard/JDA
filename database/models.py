# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Remove `managed = False` lines if you wish to allow Django to create and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
#
# Also note: You'll have to insert the output of 'django-admin.py sqlcustom [appname]'
# into your database.
from __future__ import unicode_literals

from django.db import models

class TblBiotope(models.Model):
    biotopeid = models.CharField(db_column='BiotopeID', primary_key=True, max_length=20) # Field name made lowercase.
    bbiotopename = models.CharField(db_column='BBiotopeName', max_length=20) # Field name made lowercase.
    bpropertyid = models.CharField(db_column='BPropertyID', max_length=20, blank=True) # Field name made lowercase.
    baddress = models.CharField(db_column='BAddress', max_length=30, blank=True) # Field name made lowercase.
    bbeginyear = models.DateField(db_column='BBeginYear', blank=True, null=True) # Field name made lowercase.
    class Meta:
        managed = False
        db_table = 'tbl_biotope'

class TblComplaint(models.Model):
    complaintid = models.AutoField(db_column='ComplaintID', primary_key=True, max_length=20) # Field name made lowercase.
    cuserid = models.CharField(db_column='CUserID', max_length=20) # Field name made lowercase.
    cticketsubject = models.CharField(db_column='CTicketSubject', max_length=50, blank=True) # Field name made lowercase.
    cticketcontent = models.CharField(db_column='CTicketContent', max_length=140, blank=True) # Field name made lowercase.
    ccontacttimetype = models.IntegerField(db_column='CContactTimeType', blank=True, null=True) # Field name made lowercase.
    chandler = models.CharField(db_column='CHandler', max_length=20, blank=True) # Field name made lowercase.
    chandlerphone = models.CharField(db_column='CHandlerPhone', max_length=15, blank=True) # Field name made lowercase.
    cresumetimes = models.IntegerField(db_column='CResumeTimes', blank=True, null=True) # Field name made lowercase.
    cstatus = models.IntegerField(db_column='CStatus') # Field name made lowercase.
    cupdatetime = models.DateField(db_column='CUpdateTime', blank=True, null=True) # Field name made lowercase.
    ccommittime= models.DateTimeField(db_column= 'CCommitTime', auto_now= True)
    class Meta:
        managed = False
        db_table = 'tbl_complaint'

class TblNotice(models.Model):
    noticeid = models.AutoField(db_column='NoticeID', primary_key=True, max_length= 11) # Field name made lowercase.
    nbiotopeid = models.CharField(db_column='NBiotopeID', max_length=20) # Field name made lowercase.
    nposter = models.CharField(db_column='NPoster', max_length=20) # Field name made lowercase.
    npubtime = models.DateField(db_column='NPubTime', blank=True, null=True) # Field name made lowercase.
    nexptime = models.DateField(db_column='NExpTime', blank=True, null=True) # Field name made lowercase.
    nsubject = models.CharField(db_column='NSubject', max_length=50, blank=True) # Field name made lowercase.
    ncontent = models.CharField(db_column='NContent', max_length=400, blank=True) # Field name made lowercase.
    nlabel = models.CharField(db_column='NLabel', max_length=50, blank=True) # Field name made lowercase.
    nistop = models.IntegerField(db_column='NIsTop', blank=True, null=True) # Field name made lowercase.
    nisdeleted = models.IntegerField(db_column='NIsDeleted', blank=True, null=True) # Field name made lowercase.
    updatetime = models.DateField(db_column='UpdateTime', blank=True, null=True) # Field name made lowercase.
    class Meta:
        managed = False
        db_table = 'tbl_notice'

class TblPadmin(models.Model):
    padministratorid = models.CharField(db_column='PAdministratorID', primary_key=True, max_length=20) # Field name made lowercase.
    ppassword = models.CharField(db_column='PPassword', max_length=20) # Field name made lowercase.
    padminname = models.CharField(db_column='PAdminName', max_length=20) # Field name made lowercase.
    padminphone = models.CharField(db_column='PAdminPhone', max_length=15) # Field name made lowercase.
    pissuperadmin = models.IntegerField(db_column='PIsSuperAdmin', blank=True, null=True) # Field name made lowercase.
    propertyid = models.CharField(db_column='PropertyID', max_length=15, blank=True) # Field name made lowercase.
    pstatus = models.IntegerField(db_column='PStatus', blank=True, null=True) # Field name made lowercase.
    class Meta:
        managed = False
        db_table = 'tbl_padmin'

class TblPfee(models.Model):
    pmfeeid = models.CharField(db_column='PMFeeID', primary_key=True, max_length=20) # Field name made lowercase.
    fuserid = models.CharField(db_column='FUserID', max_length=20) # Field name made lowercase.
    feeofpm = models.FloatField(db_column='FeeofPM', blank=True, null=True) # Field name made lowercase.
    fispaid = models.IntegerField(db_column='FIsPaid', blank=True, null=True) # Field name made lowercase.
    fpaiddate = models.DateField(db_column='FPaidDate', blank=True, null=True) # Field name made lowercase.
    fcomments = models.CharField(db_column='FComments', max_length=100, blank=True) # Field name made lowercase.
    class Meta:
        managed = False
        db_table = 'tbl_pfee'

class TblPost(models.Model):
    postid = models.CharField(db_column='PostID', primary_key=True, max_length=20) # Field name made lowercase.
    pphone = models.CharField(db_column='PPhone', max_length=20) # Field name made lowercase.
    psubmittime = models.DateField(db_column='PSubmitTime', blank=True, null=True) # Field name made lowercase.
    pisvadilated = models.IntegerField(db_column='PIsVadilated', blank=True, null=True) # Field name made lowercase.
    psubject = models.CharField(db_column='PSubject', max_length=50) # Field name made lowercase.
    pbodytext = models.CharField(db_column='PBodyText', max_length=300) # Field name made lowercase.
    pstate = models.IntegerField(db_column='PState', blank=True, null=True) # Field name made lowercase.
    plastreplierid = models.CharField(db_column='PLastReplierID', max_length=20) # Field name made lowercase.
    plastreptime = models.DateField(db_column='PLastRepTime', blank=True, null=True) # Field name made lowercase.
    class Meta:
        managed = False
        db_table = 'tbl_post'

class TblPosttitle(models.Model):
    postid = models.CharField(db_column='PostID', primary_key=True, max_length=20) # Field name made lowercase.
    pphone = models.CharField(db_column='PPhone', max_length=20) # Field name made lowercase.
    psubmittime = models.DateField(db_column='PSubmitTime', blank=True, null=True) # Field name made lowercase.
    pisvadilated = models.IntegerField(db_column='PIsVadilated', blank=True, null=True) # Field name made lowercase.
    psubject = models.CharField(db_column='PSubject', max_length=20) # Field name made lowercase.
    pstate = models.IntegerField(db_column='PState', blank=True, null=True) # Field name made lowercase.
    plastupdatetime = models.DateField(db_column='PLastUpdateTime', blank=True, null=True) # Field name made lowercase.
    class Meta:
        managed = False
        db_table = 'tbl_posttitle'

class TblProperty(models.Model):
    propertyid = models.CharField(db_column='PropertyID', primary_key=True, max_length=20) # Field name made lowercase.
    ppropertyname = models.CharField(db_column='PPropertyName', max_length=20) # Field name made lowercase.
    pcity = models.CharField(db_column='PCity', max_length=20, blank=True) # Field name made lowercase.
    pqualification = models.CharField(db_column='PQualification', max_length=20, blank=True) # Field name made lowercase.
    pmanager = models.CharField(db_column='PManager', max_length=20, blank=True) # Field name made lowercase.
    pmanagerphone = models.CharField(db_column='PManagerPhone', max_length=15, blank=True) # Field name made lowercase.
    class Meta:
        managed = False
        db_table = 'tbl_property'

class TblRepairticket(models.Model):
    repairticketid = models.AutoField(db_column='RepairTicketID', primary_key=True, max_length= 20) # Field name made lowercase.
    ruserid = models.CharField(db_column='RUserID', max_length=20) # Field name made lowercase.
    rticketsubject = models.CharField(db_column='RTicketSubject', max_length=50, blank=True) # Field name made lowercase.
    rticketcontent = models.CharField(db_column='RTicketContent', max_length=140, blank=True) # Field name made lowercase.
    rcontactpeople = models.CharField(db_column='RContactPeople', max_length=50, blank=True) # Field name made lowercase.
    rcontactphone = models.CharField(db_column='RContactPhone', max_length=50, blank=True) # Field name made lowercase.
    rcontacttime = models.DateField(db_column='RContactTime', blank=True, null=True) # Field name made lowercase.
    rhandler = models.CharField(db_column='RHandler', max_length=20, blank=True) # Field name made lowercase.
    rhandlerphone = models.CharField(db_column='RHandlerPhone', max_length=15, blank=True) # Field name made lowercase.
    rresumetimes = models.IntegerField(db_column='RResumeTimes', blank=True, null=True) # Field name made lowercase.
    rstatus = models.IntegerField(db_column='RStatus', blank=True, null=True) # Field name made lowercase.
    rcomment = models.CharField(db_column='RComment', max_length=100, blank=True) # Field name made lowercase.
    rupdatetime = models.DateField(db_column='RUpdateTime', blank=True, null=True) # Field name made lowercase.
    rcount = models.IntegerField(db_column='RCount', blank=True, null=True) # Field name made lowercase.
    rticketcommittime= models.DateField(db_column= 'RTicketCommitTime')
    rtickethandletime= models.DateField(db_column= 'RTicketHandleTime', null= True, blank= True)
    class Meta:
        managed = False
        db_table = 'tbl_repairticket'

class TblUser(models.Model):
    uid = models.CharField(db_column='UID', primary_key=True, max_length=20) # Field name made lowercase.
    unickname = models.CharField(db_column='UNickname', max_length=20, blank=True) # Field name made lowercase.
    uphone = models.CharField(db_column='UPhone', max_length=15) # Field name made lowercase.
    upassword = models.CharField(db_column='UPassword', max_length=20) # Field name made lowercase.
    urole = models.IntegerField(db_column='URole', blank=True, null=True) # Field name made lowercase.
    uregtime = models.DateField(db_column='URegTime') # Field name made lowercase.
    urealname = models.CharField(db_column='URealName', max_length=20, blank=True) # Field name made lowercase.
    ugender = models.IntegerField(db_column='UGender') # Field name made lowercase.
    ubirthday = models.DateField(db_column='UBirthday', blank=True, null=True) # Field name made lowercase.
    uprofession = models.CharField(db_column='UProfession', max_length=20, blank=True) # Field name made lowercase.
    ubuilding = models.IntegerField(db_column='UBuilding', blank=True, null=True) # Field name made lowercase.
    uroom = models.CharField(db_column='URoom', max_length=15, blank=True) # Field name made lowercase.
    ufamilyno = models.IntegerField(db_column='UFamilyNO', blank=True, null=True) # Field name made lowercase.
    uqqnum = models.CharField(db_column='UQQNum', max_length=20, blank=True) # Field name made lowercase.
    ucarnums = models.CharField(db_column='UCarNums', max_length=20, blank=True) # Field name made lowercase.
    class Meta:
        managed = False
        db_table = 'tbl_user'

