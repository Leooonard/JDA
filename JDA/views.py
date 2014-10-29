#coding= utf-8

from utils import *
from database import models
import time, datetime
from  django.http import HttpResponse, HttpResponseRedirect, HttpRequest

def Index(request):
     return RenderResponse('index.html')

def AjaxUserTable(request):
     orderDict= {
          'orderID': 'uid',
          'rorderID': '-uid',
          'orderRole': 'urole',
          'rorderRole': '-urole',
          'orderRegTime': 'uregtime',
          'rorderRegTime': '-uregtime'
     }
     try:
          order= request.GET.get('order', None)
          if not order:
               userList= models.TblUser.objects.order_by('uid')
               context= {
                    'userList': userList,
                    'orderID': True
               }
          else:
               if order== 'orderID' or order== 'rorderID':
                    userList= models.TblUser.objects.order_by(orderDict[order])
               else:
                    userList= models.TblUser.objects.order_by(orderDict[order], 'uid')
               context= {
                    'userList': userList,
               }
               context[order]= True
          return RenderPaginatedResponse('usertable.html', request, context)
     except Exception, e:
          return HttpResponse('failed')

def AjaxUserRow(request):
     try:
          uid= request.GET.get('uid', None)
          user= models.TblUser.objects.get(uid= uid)
          context= {
               'user': user
          }
          return RenderResponse('userrow.html', context)
     except:
          return HttpResponse('内部错误')

def AjaxIdentifyUser(request):
     uid= request.GET.get('uid', None)
     try:
          user= models.TblUser.objects.get(uid= uid)
          user.urole= 1
          user.save()
          return HttpResponse("success")
     except:
          return HttpResponse("failed")

def AjaxNewNotice(request):
     try:
          noticeStr= request.GET.get("notice", None)
          notice= ReadObjectFromJsonString(noticeStr) #notice对象
          if notice['nistop']:
               notice['nistop']= 1
          else:
               notice['nistop']= 0
          newNotice= models.TblNotice(nbiotopeid= notice['nbiotopeid'], nposter= notice['nposter'], 
               npubtime= datetime.date.today(), nsubject= notice['nsubject'], ncontent= notice['ncontent'], 
               nlabel= "", nistop= notice['nistop'])
          newNotice.save()
          return HttpResponse("success")
     except Exception, e:
          print e
          return HttpResponse("failed")

def AjaxNoticeTable(request):
     orderDict= {
          'orderID': 'noticeid',
          'rorderID': '-noticeid',
          'orderBio': 'nbiotopeid',
          'rorderBio': '-nbiotopeid',
          'orderPubTime': 'npubtime',
          'rorderPubTime': '-npubtime'
     }
     try:
          order= request.GET.get('order', None)
          if not order:         
               noticeList= models.TblNotice.objects.order_by('noticeid')
               context= {
                    'noticeList': noticeList,
                    'orderID': True
               }
          else:
               if order== 'orderID' or order== 'rorderID':
                    noticeList= models.TblNotice.objects.order_by(orderDict[order])
               else:
                    noticeList= models.TblNotice.objects.order_by(orderDict[order], 'noticeid')
               context= {
                    'noticeList': noticeList
               }
               context[order]= True
          return RenderPaginatedResponse('noticetable.html', request, context)
     except Exception, e:
          print e
          return HttpResponse('failed')

def AjaxUnrepairTable(request):
     try: 
          unrepairList= models.TblRepairticket.objects.filter(rstatus= 0)[: 5]
          context= {
               'unrepairList': unrepairList
          }
          return RenderResponse('unrepairtable.html', context)
     except:
          return HttpResponse('failed')

def AjaxUnsolveComplaintTable(request):
     try:
          unsolvecomplaintList= models.TblComplaint.objects.filter(cstatus= 0)[: 5]
          context= {
               'unsolvecomplaintList': unsolvecomplaintList
          }
          return RenderResponse('unsolvecomplainttable.html', context)
     except:
          return HttpResponse('failed')

def AjaxNotice(request):
     try:
          noticeid= request.GET.get('noticeid')
          notice= models.TblNotice.objects.get(noticeid= noticeid)
          context= {
               'notice': notice
          }
          return RenderResponse('notice.html', context)
     except Exception, e:
          return HttpResponse('failed')

def AjaxRepairTable(request):
     orderDict= {
          'orderID': 'repairticketid',
          'rorderID': '-repairticketid',
          'orderStatus': 'rstatus',
          'rorderStatus': '-rstatus',
          'orderCommitTime': 'rticketcommittime',
          'rorderCommitTime': '-rticketcommittime'
     }
     try:
          order= request.GET.get('order', None)
          if not order:
               repairList= models.TblRepairticket.objects.order_by('repairticketid')
               context= {
                    'repairList': repairList,
                    'orderID': True
               }
          else:
               if order== 'orderID' or order== 'rorderID':
                    repairList= models.TblRepairticket.objects.order_by(orderDict[order])
               else:
                    repairList= models.TblRepairticket.objects.order_by(orderDict[order], 'repairticketid')
               context= {
                    'repairList': repairList
               }
               context[order]= True
          return RenderPaginatedResponse('repairtable.html', request, context)
     except Exception, e:
          return HttpResponse('failed')

def AjaxComplaintTable(request):
     orderDict= {
          'orderID': 'complaintid',
          'rorderID': '-complaintid',
          'orderCommitTime': 'ccommittime',
          'rorderCommitTime': '-ccommittime',
          'orderStatus': 'cstatus',
          'rorderStatus': '-cstatus'
     }
     try:
          order= request.GET.get('order', None)
          if not order:
               complaintList= models.TblComplaint.objects.order_by('complaintid')
               context= {
                    'complaintList': complaintList,
                    'orderID': True
               }
          else:
               if order== 'orderID' or order== 'rorderID':
                    complaintList= models.TblComplaint.objects.order_by(orderDict[order])
               else:
                    complaintList= models.TblComplaint.objects.order_by(orderDict[order], 'complaintid')
               context= {
                    'complaintList': complaintList
               }
               context[order]= True
          return RenderPaginatedResponse('complainttable.html', request, context)
     except:
          return HttpResponse('failed')

def AjaxRepairRow(request):
     try:
          rid= request.GET.get('rid', None)
          repair= models.TblRepairticket.objects.get(repairticketid= rid)
          context= {
               'repair': repair
          }
          return RenderResponse('repairrow.html', context)
     except:
          return HttpResponse('failed')

def AjaxComplaintRow(request):
     try:
          cid= request.GET.get('cid', None)
          complaint= models.TblComplaint.objects.get(complaintid= cid)
          context= {
               'complaint': complaint
          }
          return RenderResponse('complaintrow.html', context)
     except:
          return HttpResponse('failed')

def AjaxGetLatest(request):
     try:
          if len(models.TblRepairticket.objects.order_by('-repairticketid'))== 0:
               lrid= -1
          else:
               lrid= models.TblRepairticket.objects.order_by('-repairticketid')[0].repairticketid
          if len(models.TblComplaint.objects.order_by('-complaintid'))== 0:
               lcid= -1
          else:
               lcid= models.TblComplaint.objects.order_by('-complaintid')[0].complaintid
          context= {
               'lrid': lrid,
               'lcid': lcid
          }
          JSONStr= WriteObjectToJsonString(context)
          return HttpResponse(JSONStr)
     except Exception, e:
          return HttpResponse('failed')

def AjaxHeartBeatQuery(request):
     try:
          lrid= request.GET.get('lrid', None)
          lcid= request.GET.get('lcid', None)
          repairList= []
          complaintList= []
          latestRepair= models.TblRepairticket.objects.filter(repairticketid__gt= lrid)
          latestComplaint= models.TblComplaint.objects.filter(complaintid__gt= lcid)
          for repair in latestRepair:
               repairList.append(repair.repairticketid)

          for complaint in latestComplaint:
               complaintList.append(complaint.complaintid)
          if len(models.TblRepairticket.objects.order_by('-repairticketid'))== 0:
               lrid= -1
          else:
               lrid= models.TblRepairticket.objects.order_by('-repairticketid')[0].repairticketid
          if len(models.TblComplaint.objects.order_by('-complaintid'))== 0:
               lcid= -1
          else:
               lcid= models.TblComplaint.objects.order_by('-complaintid')[0].complaintid
          context= {
               'lrid': lrid,
               'lcid': lcid,
               'repairList': repairList,
               'complaintList': complaintList
          }
          JSONStr= WriteObjectToJsonString(context)
          return HttpResponse(JSONStr)
     except Exception, e:
          return HttpResponse('failed')

def AjaxGetLatestInfo(request):
     try:
          latestList= request.GET.get('latestList', None)
          latestList= ReadObjectFromJsonString(latestList)
          latestRepairList= latestList['latestRepairList']
          latestComplaintList= latestList['latestComplaintList']
          print latestRepairList
          print latestComplaintList
          randcList= []
          for rid in latestRepairList:
               repair= models.TblRepairticket.objects.get(repairticketid= rid)
               randcList.append({
                    'id': repair.repairticketid,
                    'commitTime': repair.rticketcommittime,
                    'subject': repair.rticketsubject,
                    'type': '报修'
               })
          for cid in latestComplaintList:
               complaint= models.TblComplaint.objects.get(complaintid= cid)
               randcList.append({
                    'id': complaint.complaintid,
                    'commitTime': complaint.ccommittime,
                    'subject': complaint.cticketsubject,
                    'type': '投诉'
               })
          context= {
               'randcList': randcList
          }
          return RenderResponse('latestrepairandcomplaint.html', context)
     except Exception, e:
          import traceback; traceback.print_exc();
          return HttpResponse('failed')