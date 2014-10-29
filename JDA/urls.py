from django.conf.urls import patterns, include, url
from views import *

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'JDA.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
     (r'^index/$', Index),
     (r'^ajaxusertable/$', AjaxUserTable),
     (r'^ajaxuserrow/$', AjaxUserRow),
     (r'^ajaxidentifyuser/$', AjaxIdentifyUser),
     (r'^ajaxnewnotice/$', AjaxNewNotice),
     (r'^ajaxnoticetable/$', AjaxNoticeTable),
     (r'^ajaxunrepairtable/$', AjaxUnrepairTable),
     (r'^ajaxunsolvecomplainttable/$', AjaxUnsolveComplaintTable),
     (r'^ajaxnotice/$', AjaxNotice),
     (r'^ajaxrepairtable/$', AjaxRepairTable),
     (r'^ajaxcomplainttable/$', AjaxComplaintTable),
     (r'^ajaxrepairrow/$', AjaxRepairRow),
     (r'^ajaxcomplaintrow/$', AjaxComplaintRow),
     (r'^ajaxgetlatest/$', AjaxGetLatest),
     (r'^ajaxheartbeatquery/$', AjaxHeartBeatQuery),
     (r'^ajaxgetlatestinfo/$', AjaxGetLatestInfo),
)
