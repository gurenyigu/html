// 这个外部文件无法访问 window document parent 对象.

var i = 0;

function timedCount() {
	i++;
	// 这个外部文件通过  postMessage 来通信
	postMessage(i);
	setTimeout(timedCount, 500);
}

timedCount();
