import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import QueueAnim from 'rc-queue-anim';

export default function({components}){
    return(
        
        <Layout>
            <Header>{components.header}</Header>
            <QueueAnim delay={300}>
                <Content key="1">{components.header}</Content>
            </QueueAnim>
            <Footer key="2">{components.footer}</Footer>
        </Layout>
    );
}