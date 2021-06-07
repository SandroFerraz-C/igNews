import {GetStaticProps} from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import {stripe} from '../services/stripe';
import styles from './home.module.scss';

interface HomeProps{
    product:{
        priceId: string;
        amount:number;
    }
}

    export default function Home({ product }: HomeProps) {
    return ( 
        <>
        <Head>
            <title>Inicio | ig.News</title>
        </Head>

        <main className={styles.contentContainer}>
            <section className={styles.hero}>
                <span>👏Hey, Bem-Vindo! </span>
                <h1>Noticías sobre o mundo do <span>React</span>.</h1>
                
                <p>Tenha acesso a todas as publicações <br />
                    <span> por apenas { product.amount } por mês </span>.
                </p>

                <SubscribeButton  priceId={product.priceId}/>
            </section>

            <img src="/images/avatar.svg" alt="Girl coding" />
        </main>
        </>
    )
}

export const getStaticProps : GetStaticProps = async () => {
    const price = await stripe.prices.retrieve('price_1IyQC5HxaA0XnSrCBXegog4O')
    const product = {
            priceId: price.id,
            amount: new Intl.NumberFormat( 'pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }) . format ( price.unit_amount / 100 ),
    };
    return {
        props:{
            product,
        },
        revalidate: 60 * 60 * 24, // 24 Hours
    }
}