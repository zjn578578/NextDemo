import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useState,useEffect } from 'react';
import axios from "axios";

export default function Home() {
  const [defultaddFormList, setdefultaddFormList] = useState([])

  const request= (url) =>{
    axios.post(url,
        {latitude: 30.184843,
          longitude: 120.159737,
          pageIndex: 1,
          pageSize: 20,
          type: 0}).then(data=>{
      const newData =data.data.data.data.map(item=>{
        item.img= `https://h5.lantu7.cn/${item.logo}`
        item.href =`https://h5.lantu7.cn/#/pages/details/details?id=${item.id}&lon=120.160427&lat=30.184785&type=0`
        return item;
      })
      setdefultaddFormList(newData)
    });
  }
  useEffect(() => {
    request('https://h5.lantu7.cn/tbms/c/activities/page')
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>聚合点餐</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <a href="#" className={styles.card}>
            <h2>团小淘</h2>
          </a>

          <a href="#" className={styles.card} onClick={()=>{
            axios.get('https://mt.jzybox.com/prod-api/ms/discount/list?geolat=30.184843&geolon=120.159737&pageNum=1&pageSize=40&tag=').then(data=>{
              data.data.data.map(item=>{
                 item.img=item.listPicPath
                 item.businessName=item.shopTitle
                 item.distance=item.km
                 item.comment=item.discountTitles
                 item.remainderJoinQuota=item.lastNums
                 item.href = `https://mt.jzybox.com/pages/product/product?id=${item.id}&lat=30.184843&lon=120.159737`
              })
              setdefultaddFormList(data.data.data)
            });
          }}>
            <h2>撸餐</h2>
          </a>
          <a
            href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx220b4cd96a0c4e8f&redirect_uri=https%3A%2F%2Fgw.djtaoke.cn%2Fauth%2F10%2Fuserinfo%2F1%2Findex%2F0%2F1647414024556%3Frouter%3Dupper%253D61788069%2526t%253D727786&response_type=code&scope=snsapi_userinfo&state=9d3a0b6b9a4d8503d7c6181e57e6669b&connect_redirect=1#wechat_redirect"
            className={styles.card}
          >
            <h2>小蚕芸</h2>
          </a>
          <a
            href="https://bwc.jiulingtech.tech"
            className={styles.card}
          >
            <h2>霸王慧</h2>
          </a>
          <a
              href="https://www.nbjiazhi.top"
              className={styles.card}
          >
            <h2>饱饱生活</h2>
          </a>
          <a
              href="https://www.xxh-life.com"
              className={styles.card}
          >
            <h2>晓晓优选</h2>
          </a>
          <a
              href="https://h5.bchibhe.com"
              className={styles.card}
          >
            <h2>白吃白喝</h2>
          </a>
          <a
              href="https://vip.cchll.cn"
              className={styles.card}
          >
            <h2>吃撑黄绿</h2>
          </a>
          <a
              href="https://m.bwyc168.com"
              className={styles.card}
          >
            <h2>霸王用餐CQ</h2>
          </a>
        </div>
        {
          defultaddFormList.map(item=>(
              <div key={item.id} className={styles.merchant_box} onClick={()=>{
                location.href =item.href
              }
              }>
                <img className={styles.logo} src={item.img} alt="logo"/>
                <div className={styles.content}>
                  <div>{item.businessName}</div>
                  <div>{item.distance}米</div>
                  <div>满{item.taskRuleUp}返{item.taskRuleReturn}</div>
                  <div>{item.comment}</div>
                  <div>剩余名额：{item.remainderJoinQuota}</div>
                </div>
              </div>
          ))
        }
      </main>
    </div>
  )
}
