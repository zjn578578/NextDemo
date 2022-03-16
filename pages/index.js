import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>聚合点餐</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <a href="https://h5.lantu7.cn" className={styles.card}>
            <h2>团小淘&nbsp;&nbsp;&nbsp;&rarr;</h2>
          </a>

          <a href="https://mt.jzybox.com" className={styles.card}>
            <h2>撸餐&nbsp;&nbsp;&nbsp;&nbsp;&rarr;</h2>
          </a>

          <a
            href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx220b4cd96a0c4e8f&redirect_uri=https%3A%2F%2Fgw.djtaoke.cn%2Fauth%2F10%2Fuserinfo%2F1%2Findex%2F0%2F1647414024556%3Frouter%3Dupper%253D61788069%2526t%253D727786&response_type=code&scope=snsapi_userinfo&state=9d3a0b6b9a4d8503d7c6181e57e6669b&connect_redirect=1#wechat_redirect"
            className={styles.card}
          >
            <h2>小蚕芸 &rarr;</h2>
          </a>

          <a
            href="https://bwc.jiulingtech.tech"
            className={styles.card}
          >
            <h2>霸王慧 &rarr;</h2>
          </a>

          <a
              href="https://www.nbjiazhi.top"
              className={styles.card}
          >
            <h2>饱饱生活圈 &rarr;</h2>
          </a>

          <a
              href="https://www.xxh-life.com"
              className={styles.card}
          >
            <h2>晓晓优选 &rarr;</h2>
          </a>

          <a
              href="https://h5.bchibhe.com"
              className={styles.card}
          >
            <h2>白吃白喝 &rarr;</h2>
          </a>

          <a
              href="https://vip.cchll.cn"
              className={styles.card}
          >
            <h2>吃撑黄绿蓝 &rarr;</h2>
          </a>

          <a
              href="https://m.bwyc168.com"
              className={styles.card}
          >
            <h2>霸王用餐CQ &rarr;</h2>
          </a>
        </div>
      </main>
    </div>
  )
}
