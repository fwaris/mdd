(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,jQuery,WebSharper,Html,Default,List,Microsoft,_,BingView,State,Unchecked,Seq,SiteCommon,OrdersPage,OrderController,Remoting,OrderView,Concurrency,Operators,HTML5,Math,Path,Calc,Operators1,Collections,MapModule,Arrays,_FSharpSet_1,T,Error,RoutePage,window;
 Runtime.Define(Global,{
  "":{
   BingView:{
    EnsureMap:function()
    {
     var jqm,ph,container,x,f,_1,dmCallback;
     jqm=jQuery("#route_map");
     if(jqm.length===0)
      {
       ph=jQuery("#route_ph");
       container=Default.Div(List.ofArray([Default.Id("route_map")]));
       x=ph.replaceWith(container.Body);
       f=function(value)
       {
        value;
       };
       f(x);
       _1=new Microsoft.Maps.Map(container.Body,BingView.MapOptions());
       State.map=function()
       {
        return _1;
       };
       State.map().setMapType(Microsoft.Maps.MapTypeId.road);
       dmCallback=function()
       {
        var _2;
        _2=new Microsoft.Maps.Directions.DirectionsManager(State.map());
        State.dirMgr=function()
        {
         return _2;
        };
       };
       return Microsoft.Maps.loadModule("Microsoft.Maps.Directions",{
        callback:dmCallback
       });
      }
     else
      {
       return null;
      }
    },
    MapOptions:Runtime.Field(function()
    {
     var _returnVal_18_1;
     _returnVal_18_1=[{}];
     _returnVal_18_1[0].credentials=State.credentials();
     _returnVal_18_1[0].width=400;
     _returnVal_18_1[0].height=400;
     return _returnVal_18_1[0];
    }),
    ShowRoute:function(points)
    {
     var x,f,mapping,f1,action;
     if(!Unchecked.Equals(State.dirMgr(),null))
      {
       State.dirMgr().resetDirections();
       x=(f=(mapping=function(p)
       {
        var returnVal;
        return new Microsoft.Maps.Directions.Waypoint((returnVal=[{}],(null,returnVal[0].location=new Microsoft.Maps.Location(p.Lat,p.Lon),returnVal[0])));
       },function(list)
       {
        return List.map(mapping,list);
       }),f(points));
       f1=(action=function(wp)
       {
        return State.dirMgr().addWaypoint(wp);
       },function(list)
       {
        return Seq.iter(action,list);
       });
       f1(x);
       return State.dirMgr().calculateDirections();
      }
     else
      {
       return SiteCommon.Popup("Map not yet ready");
      }
    },
    State:{
     credentials:Runtime.Field(function()
     {
      return"Ah7f3rj-5hx-JvQEBWklc7NHwman6oJ4Ug8BqASMyvexSWbuL5IWT1qnxa0Ew9eB";
     }),
     dirMgr:Runtime.Field(function()
     {
      return null;
     }),
     map:Runtime.Field(function()
     {
      return null;
     })
    }
   },
   OrdersPage:{
    Attach:function()
    {
     var page,handler;
     jQuery("#routes_button").on("click",function(_arg00_)
     {
      return OrderController.validateAndRoute(_arg00_);
     });
     page=jQuery("#orders_page");
     handler=function()
     {
      return OrdersPage.LoadOrders();
     };
     return page.on("pageshow",handler);
    },
    LoadOrders:function()
    {
     var ph,x,f,f5;
     ph=jQuery("#orders_ph");
     if(ph.length>0)
      {
       x=(f=function()
       {
        var x1,f1;
        x1=Remoting.Async("Website:0",["48126"]);
        f1=function(_arg1)
        {
         var list,x2,f2,x3,f3,x4,f4;
         list=OrderView.CreateList(_arg1);
         x2=ph.replaceWith(list.Body);
         f2=function(value)
         {
          value;
         };
         f2(x2);
         x3=jQuery(list.Body);
         f3=function(arg00)
         {
          return arg00.listview();
         };
         f3(x3);
         x4=jQuery(list.Body).find("input[type=checkbox]");
         f4=function(arg00)
         {
          return arg00.checkboxradio();
         };
         f4(x4);
         return Concurrency.Return(null);
        };
        return Concurrency.Bind(x1,f1);
       },Concurrency.Delay(f));
       f5=function(arg00)
       {
        var t;
        t={
         $:0
        };
        return Concurrency.Start(arg00);
       };
       return f5(x);
      }
     else
      {
       return null;
      }
    },
    OrderController:{
     validateAndRoute:function()
     {
      var selectedOrders,x,f,objectArg;
      selectedOrders=jQuery("input[type=checkbox]").filter(":checked").toArray();
      if(selectedOrders.length===0)
       {
        SiteCommon.Popup("No orders selected");
       }
      else
       {
        x=jQuery("#route_page");
        f=(objectArg=jQuery.mobile,function(arg00)
        {
         return objectArg.changePage(arg00);
        });
        f(x);
       }
      return true;
     }
    },
    OrderView:{
     CreateList:function(orders)
     {
      return Operators.add(Default.UL(List.ofArray([((OrderView.data())("role"))("listview"),((OrderView.data())("theme"))("d")])),Seq.delay(function()
      {
       var f,mapping;
       return Seq.collect(Runtime.Tupled(function(matchValue)
       {
        var ord,i,bg;
        ord=matchValue[1];
        i=matchValue[0];
        bg=List.ofArray(["#B5DAFF","#FFDAB4"]).get_Item(i%2);
        return Seq.append([OrderView.OrderHeader(ord,bg)],Seq.delay(function()
        {
         return OrderView.OrderItems(ord,bg);
        }));
       }),(f=(mapping=function(i)
       {
        return function(o)
        {
         return[i,o];
        };
       },function(list)
       {
        return List.mapi(mapping,list);
       }),f(orders)));
      }));
     },
     OrderHeader:function(order,bg)
     {
      var arg00,_this,x,_this1,_this2,arg10;
      return Operators.add(Default.LI(List.ofArray([(arg00="background:"+bg,(_this=Default.Attr(),_this.NewAttr("style",arg00)))])),List.ofArray([Operators.add((x=List.ofArray([((OrderView.data())("corners"))("false")]),(_this1=Default.Tags(),_this1.NewTag("label",x))),List.ofArray([Default.Input(List.ofArray([(_this2=Default.Attr(),_this2.NewAttr("type","checkbox")),(arg10=order.Id,Default.Attr().NewAttr("order_id",arg10))])),Default.Text(order.Addr)]))]));
     },
     OrderItems:function(order,bg)
     {
      return Seq.delay(function()
      {
       return Seq.map(function(oi)
       {
        var arg00,_this,arg001,_this1,x,_this2,x1;
        return Operators.add(Default.LI(List.ofArray([(arg00="background:"+bg,(_this=Default.Attr(),_this.NewAttr("style",arg00)))])),List.ofArray([Default.Img(List.ofArray([(arg001="flowers2/"+oi.FileName,(_this1=Default.Attr(),_this1.NewAttr("src",arg001)))])),Default.Span(List.ofArray([(x=List.ofArray([Default.Text(oi.Name)]),(_this2=Default.Tags(),_this2.NewTag("strong",x)))])),Operators.add(Default.Span(List.ofArray([Default.Attr().Class("ui-li-count")])),List.ofArray([(x1=Global.String(oi.Quantity),Default.Text(x1))]))]));
       },order.Items);
      });
     },
     data:Runtime.Field(function()
     {
      return function(arg00)
      {
       return function(arg10)
       {
        var _this,arg001;
        _this=HTML5.Attr();
        arg001="data-"+arg00;
        return _this.NewAttr(arg001,arg10);
       };
      };
     })
    }
   },
   Path:{
    Calc:{
     calcDist:function(lat1,lon1,lat2,lon2)
     {
      var phi_1,phi_2,th_1,th_2,d;
      phi_1=(90-lat1)*0.017453293;
      phi_2=(90-lat2)*0.017453293;
      th_1=lon1*0.017453293;
      th_2=lon2*0.017453293;
      d=3958.75*Math.acos(Math.sin(phi_1)*Math.sin(phi_2)*Math.cos(th_1-th_2)+Math.cos(phi_1)*Math.cos(phi_2));
      return d;
     },
     shortestPath:function(points)
     {
      var allPairsDist,latLong,f,graph,x,x1,f1,projection,f2,mapping,f6,shortestPath,startList,visitedSet,sp,f8,mapping2;
      allPairsDist=Seq.toList(Seq.delay(function()
      {
       return Seq.collect(function(i)
       {
        return Seq.collect(function(j)
        {
         var patternInput,z1,p1,patternInput1,z2,p2,dist,lat1,lon1,lat2,lon2;
         patternInput=points[i];
         z1=patternInput[0];
         p1=patternInput[1];
         patternInput1=points[j];
         z2=patternInput1[0];
         p2=patternInput1[1];
         dist=(lat1=p1[0],(lon1=p1[1],(lat2=p2[0],(lon2=p2[1],Calc.calcDist(lat1,lon1,lat2,lon2)))));
         return Seq.append([[z1,[z2,dist]]],Seq.delay(function()
         {
          return[[z2,[z1,dist]]];
         }));
        },Operators1.range(i+1,points.length-1));
       },Operators1.range(0,points.length-1));
      }));
      latLong=(f=function(elements)
      {
       return MapModule.OfArray(elements);
      },f(points));
      graph=(x=(x1=(f1=(projection=Runtime.Tupled(function(tupledArg)
      {
       var a,b;
       a=tupledArg[0];
       b=tupledArg[1];
       return a;
      }),function(source)
      {
       return Seq.groupBy(projection,source);
      }),f1(allPairsDist)),(f2=(mapping=Runtime.Tupled(function(tupledArg)
      {
       var a,xs,x2,x3,f3,mapping1,f4,f5,projection1;
       a=tupledArg[0];
       xs=tupledArg[1];
       return[a,(x2=(x3=(f3=(mapping1=Runtime.Tupled(function(tuple)
       {
        return tuple[1];
       }),function(source)
       {
        return Seq.map(mapping1,source);
       }),f3(xs)),(f4=function(source)
       {
        return Seq.toArray(source);
       },f4(x3))),(f5=(projection1=Runtime.Tupled(function(tuple)
       {
        return tuple[1];
       }),function(array)
       {
        return Arrays.sortBy(projection1,array);
       }),f5(x2)))];
      }),function(source)
      {
       return Seq.map(mapping,source);
      }),f2(x1))),(f6=function(elements)
      {
       return MapModule.OfArray(Seq.toArray(elements));
      },f6(x)));
      shortestPath=(startList=List.ofArray([points[0][0]]),(visitedSet=_FSharpSet_1.New(startList),(sp=function(_arg1,sDone)
      {
       var zfrom,edges,x2,f3,chooser,f5;
       if(_arg1.$==1)
        {
         zfrom=_arg1.$0;
         edges=graph.get_Item(zfrom);
         x2=(f3=(chooser=Runtime.Tupled(function(tupledArg)
         {
          var z,d,f4;
          z=tupledArg[0];
          d=tupledArg[1];
          if(f4=function(set)
          {
           return set.Contains(z);
          },f4(sDone))
           {
            return{
             $:0
            };
           }
          else
           {
            return{
             $:1,
             $0:z
            };
           }
         }),function(array)
         {
          return Seq.tryPick(chooser,array);
         }),f3(edges));
         f5=function(_arg2)
         {
          var f4,z,f7;
          if(_arg2.$==0)
           {
            f4=function(list)
            {
             return List.rev(list);
            };
            return f4(_arg1);
           }
          else
           {
            z=_arg2.$0;
            return sp(Runtime.New(T,{
             $:1,
             $0:z,
             $1:_arg1
            }),(f7=function(set)
            {
             return set.Add(z);
            },f7(sDone)));
           }
         };
         return f5(x2);
        }
       else
        {
         return Operators1.Raise(new Error("C:\\Users\\Fai\\Documents\\Visual Studio 2012\\Projects\\MobiFLW\\MobiFLW\\Website\\PathCalc.fs"+" at "+49+":"+24));
        }
      },sp(startList,visitedSet))));
      f8=(mapping2=function(z)
      {
       return[z,latLong.get_Item(z)];
      },function(list)
      {
       return List.map(mapping2,list);
      });
      return f8(shortestPath);
     }
    }
   },
   RoutePage:{
    Attach:function()
    {
     var page,handler;
     page=jQuery("#route_page");
     handler=function()
     {
      return RoutePage.StartRoute();
     };
     return page.on("pageshow",handler);
    },
    GetLoc:function()
    {
     var callback;
     callback=Runtime.Tupled(function(tupledArg)
     {
      var onOk,_arg1,_arg2;
      onOk=tupledArg[0];
      _arg1=tupledArg[1];
      _arg2=tupledArg[2];
      SiteCommon.Popup("Getting location...");
      return window.navigator.geolocation.getCurrentPosition(function(pos)
      {
       SiteCommon.ClosePopup();
       return onOk(pos);
      });
     });
     return Concurrency.FromContinuations(function(ok)
     {
      return function(no)
      {
       return callback([ok,no,function(value)
       {
        value;
       }]);
      };
     });
    },
    StartRoute:function()
    {
     var orderIds,x,f,mapping,x1,f1,f5;
     BingView.EnsureMap();
     orderIds=(x=jQuery("input[type=checkbox]").filter(":checked").toArray(),(f=(mapping=function(dom)
     {
      return dom.getAttribute("order_id");
     },function(array)
     {
      return Arrays.map(mapping,array);
     }),f(x)));
     x1=(f1=function()
     {
      var x2,f2;
      x2=SiteCommon.op_LessBarBarGreater(RoutePage.GetLoc(),Remoting.Async("Website:1",[orderIds]));
      f2=Runtime.Tupled(function(_arg1)
      {
       var routePoints,loc,startPoint,x3,x4,f3,f4;
       routePoints=_arg1[1];
       loc=_arg1[0];
       startPoint={
        Addr:"Start",
        Lat:loc.coords.latitude,
        Lon:loc.coords.longitude
       };
       x3=(x4=Runtime.New(T,{
        $:1,
        $0:startPoint,
        $1:routePoints
       }),(f3=function(points)
       {
        return RoutePage.shortestPath(points);
       },f3(x4)));
       f4=function(points)
       {
        return BingView.ShowRoute(points);
       };
       f4(x3);
       return Concurrency.Return(null);
      });
      return Concurrency.Bind(x2,f2);
     },Concurrency.Delay(f1));
     f5=function(arg00)
     {
      var t;
      t={
       $:0
      };
      return Concurrency.Start(arg00);
     };
     return f5(x1);
    },
    shortestPath:function(points)
    {
     var x,x1,x2,f,mapping,f1,f2,f3,mapping1;
     x=(x1=(x2=(f=(mapping=function(p)
     {
      return[p.Addr,[p.Lat,p.Lon]];
     },function(list)
     {
      return List.map(mapping,list);
     }),f(points)),(f1=function(list)
     {
      return Arrays.ofSeq(list);
     },f1(x2))),(f2=function(points1)
     {
      return Calc.shortestPath(points1);
     },f2(x1)));
     f3=(mapping1=Runtime.Tupled(function(tupledArg)
     {
      var z,_arg1,lon,lat;
      z=tupledArg[0];
      _arg1=tupledArg[1];
      lon=_arg1[1];
      lat=_arg1[0];
      return{
       Addr:z,
       Lat:lat,
       Lon:lon
      };
     }),function(list)
     {
      return List.map(mapping1,list);
     });
     return f3(x);
    }
   },
   SiteCommon:{
    ClosePopup:function()
    {
     var x,f;
     x=jQuery("#message_popup");
     f=function(arg00)
     {
      return arg00.popup("close");
     };
     return f(x);
    },
    Popup:function(s)
    {
     var p,popup,x,_this,f,f1,f2,x1,f3,f4;
     p=jQuery("#message_popup");
     if(p.length===0)
      {
       popup=(x=Operators.add(Default.Div(List.ofArray([Default.Id("message_popup"),(_this=Default.Attr(),_this.NewAttr("style","padding:10px"))])),List.ofArray([Operators.add(Default.Div(List.ofArray([Default.Id("popup_msg")])),List.ofArray([Default.Text(s)]))])).Body,(f=function(arg00)
       {
        return jQuery(arg00);
       },f(x)));
       f1=function(arg00)
       {
        return arg00.popup();
       };
       f1(popup);
       f2=function(arg00)
       {
        return arg00.popup("open");
       };
       return f2(popup);
      }
     else
      {
       x1=p.find("#popup_msg").val(s);
       f3=function(value)
       {
        value;
       };
       f3(x1);
       f4=function(arg00)
       {
        return arg00.popup("open");
       };
       return f4(p);
      }
    },
    op_LessBarBarGreater:function(a1,a2)
    {
     var f;
     f=function()
     {
      var x,timeOut,f1;
      x=(timeOut={
       $:0
      },Concurrency.StartChild(a1));
      f1=function(_arg1)
      {
       var x1,timeOut1,f2;
       x1=(timeOut1={
        $:0
       },Concurrency.StartChild(a2));
       f2=function(_arg2)
       {
        var f3;
        f3=function(_arg3)
        {
         var f4;
         f4=function(_arg4)
         {
          var x2;
          x2=[_arg3,_arg4];
          return Concurrency.Return(x2);
         };
         return Concurrency.Bind(_arg2,f4);
        };
        return Concurrency.Bind(_arg1,f3);
       };
       return Concurrency.Bind(x1,f2);
      };
      return Concurrency.Bind(x,f1);
     };
     return Concurrency.Delay(f);
    }
   }
  },
  MobiFLW:{
   RootControl:Runtime.Class({
    get_Body:function()
    {
     var x,f,f1;
     x=Default.Div(Runtime.New(T,{
      $:0
     }));
     f=(f1=function()
     {
      OrdersPage.Attach();
      OrdersPage.LoadOrders();
      return RoutePage.Attach();
     },function(w)
     {
      return Operators.OnAfterRender(f1,w);
     });
     f(x);
     return x;
    }
   })
  }
 });
 Runtime.OnInit(function()
 {
  jQuery=Runtime.Safe(Global.jQuery);
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Html=Runtime.Safe(WebSharper.Html);
  Default=Runtime.Safe(Html.Default);
  List=Runtime.Safe(WebSharper.List);
  Microsoft=Runtime.Safe(Global.Microsoft);
  _=Runtime.Safe(Global[""]);
  BingView=Runtime.Safe(_.BingView);
  State=Runtime.Safe(BingView.State);
  Unchecked=Runtime.Safe(WebSharper.Unchecked);
  Seq=Runtime.Safe(WebSharper.Seq);
  SiteCommon=Runtime.Safe(_.SiteCommon);
  OrdersPage=Runtime.Safe(_.OrdersPage);
  OrderController=Runtime.Safe(OrdersPage.OrderController);
  Remoting=Runtime.Safe(WebSharper.Remoting);
  OrderView=Runtime.Safe(OrdersPage.OrderView);
  Concurrency=Runtime.Safe(WebSharper.Concurrency);
  Operators=Runtime.Safe(Html.Operators);
  HTML5=Runtime.Safe(Default.HTML5);
  Math=Runtime.Safe(Global.Math);
  Path=Runtime.Safe(_.Path);
  Calc=Runtime.Safe(Path.Calc);
  Operators1=Runtime.Safe(WebSharper.Operators);
  Collections=Runtime.Safe(WebSharper.Collections);
  MapModule=Runtime.Safe(Collections.MapModule);
  Arrays=Runtime.Safe(WebSharper.Arrays);
  _FSharpSet_1=Runtime.Safe(Collections["FSharpSet`1"]);
  T=Runtime.Safe(List.T);
  Error=Runtime.Safe(Global.Error);
  RoutePage=Runtime.Safe(_.RoutePage);
  return window=Runtime.Safe(Global.window);
 });
 Runtime.OnLoad(function()
 {
  OrderView.data();
  State.map();
  State.dirMgr();
  State.credentials();
  BingView.MapOptions();
 });
}());
