import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useState,useEffect } from 'react';
import axios from "axios";


export default function Home() {
  const [defultaddFormList, setdefultaddFormList] = useState([])
  const [src, setSrc] = useState('')
  const [lat, setLat] = useState(30.184843)
  const [long, setLong] = useState(120.159737)
  const [iframeVisible, setIframeVisible] = useState(false)
  const href =
      [ "https://h5.lantu7.cn",
        "https://mt.jzybox.com",
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx220b4cd96a0c4e8f&redirect_uri=https%3A%2F%2Fgw.djtaoke.cn%2Fauth%2F10%2Fuserinfo%2F1%2Findex%2F0%2F1647414024556%3Frouter%3Dupper%253D61788069%2526t%253D727786&response_type=code&scope=snsapi_userinfo&state=9d3a0b6b9a4d8503d7c6181e57e6669b&connect_redirect=1#wechat_redirect",
        "https://bwc.jiulingtech.tech",
        "https://www.nbjiazhi.top",
        "https://www.xxh-life.com",
        "https://h5.bchibhe.com",
        "https://vip.cchll.cn",
        "https://m.bwyc168.com"
      ]
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(res){
        setLat(res.coords.latitude)
        setLong(res.coords.longitude)
        request('https://h5.lantu7.cn/tbms/c/activities/page',res.coords.latitude,res.coords.longitude)
      });
    } else {
      alert('该浏览器不支持定位1');
    }
    request('https://h5.lantu7.cn/tbms/c/activities/page',lat,long)
  }, []);

  const request= (url,lat,long) =>{
    axios.post(url,
        {latitude: lat,
          longitude: long,
          pageIndex: 1,
          pageSize: 40,
          type: 0}).then(data=>{
      const newData =data.data.data.data.map(item=>{
        item.img= `https://h5.lantu7.cn/${item.logo}`
        item.href =`https://h5.lantu7.cn/#/pages/details/details?id=${item.id}&lon=${long}&lat=${lat}&type=0`
        item.platform = item.mediaTypeName === '美团外卖'?1:0
        item.distance = (item.distance/1000).toFixed(2)
        return item;
      })
      setdefultaddFormList(newData)
      setSrc(href[0])
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>聚合点餐</title>
        <meta name="description" content= "Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <a href="#" className={styles.card} onClick={()=>{
            request('https://h5.lantu7.cn/tbms/c/activities/page',lat,long)
          }}>
            <h2>团小淘</h2>
          </a>
          <a href="#" className={styles.card} onClick={()=>{
            axios.get(`https://mt.jzybox.com/prod-api/ms/discount/list?geolat=${lat}3&geolon=${long}&pageNum=1&pageSize=40&tag=`).then(data=>{
              data.data.data.map(item=>{
                 item.img=item.listPicPath
                 item.businessName=item.shopTitle
                 item.distance=item.km.slice(0,4)
                 item.comment=item.discountTitles
                 item.remainderJoinQuota=item.lastNums
                 item.href = `https://mt.jzybox.com/pages/product/product?id=${item.id}&lat=${lat}&lon=${long}`
                 item.platform = item.outPlat === 'mt'?1:0
              })
              setdefultaddFormList(data.data.data)
              setSrc(href[1])
            });
          }}>
            <h2>撸餐</h2>
          </a>
          <a
            href="#"
            className={styles.card}
            onClick={()=>{
              axios.post('https://gw.djtaoke.cn/rpc',{
                "latitude": lat,
                "longitude": long,
                "promotion_sort": 0,
                "store_type": 0,
                "offset": 0,
                "number": 40,
                "silk_id": 0,
                "promotion_filter": 0,
                "promotion_category": 0,
                "user_id": 29356
              },{headers:{
                  servername:'Silkworm',
                  methodname:'SilkwormService.GetStorePromotionList'
                }}).then(data=>{
                data.data.promotion_list.map(item=>{
                  item.img=item.store.icon
                  item.businessName=item.store.name
                  item.comment=item.remark
                  item.distance = (item.distance/1000).toFixed(2)
                  item.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx220b4cd96a0c4e8f&redirect_uri=https%3A%2F%2Fgw.djtaoke.cn%2Fauth%2F10%2Fuserinfo%2F1%2Findex%2F0%2F1647414024556%3Frouter%3Dupper%253D61788069%2526t%253D727786&response_type=code&scope=snsapi_userinfo&state=9d3a0b6b9a4d8503d7c6181e57e6669b&connect_redirect=1#wechat_redirect`
                  if(item.eleme_status === 1){
                    item.platform = 0
                    item.remainderJoinQuota=item.eleme_left_number
                    item.taskRuleUp = item.eleme_order_money/100
                    item.taskRuleReturn =item.eleme_user_rebate/100
                  }else if(item.meituan_status === 1){
                    item.platform = 1
                    item.remainderJoinQuota=item.meituan_left_number
                    item.taskRuleUp = item.meituan_order_money/100
                    item.taskRuleReturn = item.meituan_user_rebate/100
                  }
                })
                setdefultaddFormList(data.data.promotion_list)
                setSrc(href[2])
              });
            }}
          >
            <h2>小蚕芸</h2>
          </a>
          <a
            href="#"
            className={styles.card}
            onClick={()=>{
              axios.post('https://bwc.jiulingtech.tech/api/index',{
                "latitude": lat,
                "longitude": long,
              }).then(data=>{
                data.data.data.list.map(item=>{
                  item.distance=item.distance.toFixed(2)
                  item.businessName=item.name
                  item.img=`https://bwhfile.jiulingtech.tech/${item.image}`
                  item.platform = item.type === 0?1:0
                  item.remainderJoinQuota=item.residue_num
                  item.href = `https://bwc.jiulingtech.tech/bwcH5/#/merchantDetail/${item.id}`
                  item.taskRuleUp = item.full
                  item.taskRuleReturn = item.subtract
                });
                setdefultaddFormList(data.data.data.list)
                setSrc(href[3])
              })
            }}
          >
            <h2>霸王慧</h2>
          </a>
          <a
              href="#"
              className={styles.card}
              onClick={()=>{
                axios.post('https://m.jiazhi11.cn/applet/index/task_list?page=1',{
                  cat: 0,
                  city: 0,
                  latitude: lat,
                  longitude: long,
                  page: 1,
                  version: "130"
                }).then(data=>{
                  data.data.data.list.map(item=>{
                    item.distance=item.distance.toFixed(2)
                    item.businessName=item.shop_name
                    item.img=`https://baobao6.oss-accelerate.aliyuncs.com/${item.index_image}?x-oss-process=image/resize,mfit,w_200,h_200/format,jpg/quality,q_80`
                    item.platform = item.task_platform[0].platform_name === '美团'?1:0
                    item.remainderJoinQuota=item.stock
                    item.href = `https://www.nbjiazhi.top/pages/index/task?id=${item.task_id}`
                    item.comment = item.task_remark
                    item.taskRuleUp = item.task_platform[0].satisfy_money
                    item.taskRuleReturn = item.task_platform[0].rebate_money
                  });
                   setdefultaddFormList(data.data.data.list)
                   setSrc(href[4])
                })
              }}
          >
            <h2>饱饱生活</h2>
          </a>
          <a
              href="#"
              className={styles.card}
              onClick={()=>{
                axios.get(`https://xxh-web-api.xiaoxiao.mmoyun.cn/task?lat=${lat}&lng=${long}&offset=1&length=10&status=late`).then(data=>{
                  data.data.data.task.map(item=>{
                    item.distance=item.distance.slice(0,4)
                    item.businessName=item.name
                    item.img= item.cover
                    item.platform = item.platform_name === '美团外卖'?1:0
                    item.remainderJoinQuota=item.remaining_quota
                    item.href = `https://www.xxh-life.com/#/pages/index/details/details?id=${item.id}`
                    item.comment = item.rule
                  });
                  setdefultaddFormList(data.data.data.task)
                  setSrc(href[5])
                })
              }}
          >
            <h2>晓晓优选</h2>
          </a>
          <a
              href="#"
              className={styles.card}
              onClick={()=>{
                axios.get(`https://h5.bchibhe.com/mt-trd/app/merchant/list?limit=10&page=1&longitude=${long}&latitude=${lat}`).then(data=>{
                  console.log(data.data.data.list)
                  data.data.data.list.map(item=>{
                    item.distance=(item.distance/1000).toFixed(2)
                    item.businessName=item.name
                    item.img= `https://h5.bchibhe.com/file/${item.logo}`
                    item.platform = item.originType === 0?1:0
                    item.remainderJoinQuota=item.residueNum
                    item.href = `https://h5.bchibhe.com/#/pages/mdetail/take/detail?id=${item.id}`
                    item.taskRuleUp = item.condition
                    item.taskRuleReturn = item.normalDiscounts
                  });
                  setdefultaddFormList(data.data.data.list)
                  setSrc(href[6])
                })
              }}
          >
            <h2>白吃白喝</h2>
          </a>
          <a
              href="#"
              className={styles.card}
              onClick={()=>{
                axios.post('https://vip.cchll.cn/thanos-api/activity/list',{
                  category: 0,
                  cityId: 1,
                  distance: 1,
                  pageNumber: 1,
                  pageSize: 10,
                  queryActivityVersion: 1,
                  latitude: lat,
                  longitude: long,
                }).then(data=>{
                  data.data.data.dataList.map(item=>{
                    item.businessName=item.shopName
                    item.img= item.logoUrl
                    item.platform = item.discountList[0].platform !== 'eleme'?1:0
                    item.remainderJoinQuota=item.discountList[0].remainCount
                    item.href = `https://vip.cchll.cn/detail.html?shopId=${item.shopId}`
                    item.comment = item.coupon
                    item.distance = item.distance.substr(0,item.distance.length-2);
                  });
                  setdefultaddFormList(data.data.data.dataList)
                  setSrc(href[7])
                })
              }}
          >
            <h2>吃撑黄绿</h2>
          </a>
          <a
              href="#"
              className={styles.card}
              onClick={()=>{
                setSrc(href[8])
              }}
          >
            <h2>霸王用餐</h2>
          </a>
        </div>
        <div style={{marginBottom:50,marginTop:103}}>
        {
          iframeVisible === false?
          defultaddFormList.map((item,index)=>(
              item.remainderJoinQuota === 0 || item.remainderJoinQuota ==='0' ?'':
                    <div key={index} className={styles.merchant_box} onClick={()=>{
                      location.href =item.href
                    }
                    }>
                      <img className={styles.logo} src={item.img} alt="logo"/>
                      <div className={styles.content}>
                        <div className={styles.businessName}>{item.businessName}</div>
                        <div className={styles.sort}>
                          {item.platform===1?
                              <div className={styles.meituan}>美团外卖</div>
                              :
                              <div className={styles.eleme}>饿了么</div>
                          }
                          {item.taskRuleUp?
                              <div className={styles.activity}>
                                满{item.taskRuleUp}返{item.taskRuleReturn}
                              </div>:''
                          }
                        </div>
                        <div style={{fontSize:14}}>{item.comment}</div>
                        <div style={{display:'flex'}}>
                          <div className={styles.remainderJoinQuota}>剩余名额：{item.remainderJoinQuota}</div>
                          <div className={styles.distance}>{item.distance}km</div>
                        </div>
                      </div>
                  </div>
          )):''
        }
          {iframeVisible?
              <div style={{height:'75vh'}}>
                <iframe src={src} frameBorder="0" height="100%" width="100%"></iframe>
              </div> :''
          }
        </div>
          <ul className={styles.tabbar}>
            <li >
              <a class='active' href="#"
              onClick={()=>{
                setIframeVisible(false)
              }}
              >
                <p>聚合点餐</p>
              </a>
            </li>
            <li>
              <a href="#"
              onClick={()=>{
                setIframeVisible(true)
              }}
              >
                <p>聚合首页</p>
              </a>
            </li>
            <li>
              <a href="#"
                 onClick={()=>{
                   location.href = src
                 }}
              >
                <p>直接跳转</p>
              </a>
            </li>
          </ul>
      </main>
    </div>
  )
}
