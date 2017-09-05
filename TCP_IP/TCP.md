# TCP协议的 三次握手 四次挥手
## TCP协议标志位
* 共六个:
    1. URG: 紧急指针(urgent pointer)有效
    2. SYN: 发起一个新连接(synchronous)
    3. ACK: 确认(acknowledgement)
    4. PSH: 传送(push)接收方应尽量将这个报文交给应用层
    5. FIN: 结束(finish)释放一个连接
    6. RST: 重置连接(reset)
    
## 三次握手
* 用来建立TCP连接. 当建立一个TCP连接时,需要客户端和服务器总共发送三个包以确认连接的建立
    1. 第一次握手: Client 将标志位SYN置为1,随机产生一个值 seq=J,并将该数据包发送给Server,Client进入SYN_SENT状态,等待Server确认.
    2. 第二次握手: Server收到数据包后根据标志位SYN=1知道了Client请求建立连接,Server将标志位SYN和ACK都置为1,ACK(number)=J+1,随机产生一个值seq=K,并将该数据包发送给Client以确认连接请求,Server进入SYN_RCVD状态.
    3. 第三次握手: Client收到确认后,检查ack是否为 J+1,ACK是否为1,如果正确则将标志位ACK置为1,ack=K+1,并将该数据包发送给Server,Server检查ACK是否为1,如果正确链接建立成功,Client和Server进入ESTABLISHED状态,完成三次握手.随后Client与Server之间可以开始传输数据了.

## 四次握手
* 四次握手(Four-Way Wavehand),终止TCP链接. 指的是: 断开一个TCP连接时,需要Client与Server总共发送4个数据包确认连接断开.可以由任意一方触发
*  由于TCP连接时全双工的，因此，每个方向都必须要单独进行关闭，这一原则是当一方完成数据发送任务后，发送一个FIN来终止这一方向的连接，收到一个FIN只是意味着这一方向上没有数据流动了，即不会再收到数据了，但是在这个TCP连接上仍然能够发送数据，直到这一方向也发送了FIN。
    * 首先进行关闭的一方将执行主动关闭，而另一方则执行被动关闭
        1. 第一次挥手: Client发送一个FIN(携带一个随机数),用来关闭Client到Server的数据传送,Client进入FIN_WAIT_1状态
        2. 第二次挥手: Server收到FIN后,发送一个ACK给Client,Server进入CLOSE_WAIT状态.Client(通过收到的数字是否为发送随机数+1)进入FIN_WAIT_2状态
        3. 第三次挥手: Server发送一个FIN(携带一个随机数),用来关闭Server到Client的数据传送,Server进入LAST_ACK状态.
        4. 第四次挥手: Client收到FIN后,Client进入TIME_WAIT状态,接着发送一个ACK给Server,(根据收到的数字是否为发送随机数+1)Server进入CLOSED状态,完成四次挥手.
        
# 为什么建立连接是三次握手，而关闭连接却是四次挥手呢？
 
* 这是因为服务端在LISTEN状态下，收到建立连接请求的SYN报文后，把ACK和SYN放在一个报文里发送给客户端。而关闭连接时，当收到对方的FIN报文时，仅仅表示对方不再发送数据了但是还能接收数据，己方也未必全部数据都发送给对方了，所以己方可以立即close，也可以发送一些数据给对方后，再发送FIN报文给对方来表示同意现在关闭连接，因此，己方ACK和FIN一般都会分开发送。
        
# SYN攻击
* 在三次握手过程中，Server发送SYN-ACK之后，收到Client的ACK之前的TCP连接称为半连接（half-open connect），此时Server处于SYN_RCVD状态，当收到ACK后，Server转入ESTABLISHED状态。SYN攻击就是Client在短时间内伪造大量不存在的IP地址，并向Server不断地发送SYN包，Server回复确认包，并等待Client的确认，由于源地址是不存在的，因此，Server需要不断重发直至超时，这些伪造的SYN包将长时间占用未连接队列，导致正常的SYN请求因为队列满而被丢弃，从而引起网络堵塞甚至系统瘫痪。SYN攻击时一种典型的DDOS攻击，检测SYN攻击的方式非常简单，即当Server上有大量半连接状态且源IP地址是随机的，则可以断定遭到SYN攻击了，使用如下命令可以让之现行：
  * #netstat -nap | grep SYN_RECV