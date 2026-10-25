---
title: 二十一.STL常用容器
author: 连思鑫
tags:
  - c++
  - STL
categories:
  - ..
  - C++
  - C++提高编程
  - ''
date: 2026-10-25 18:13:00
---

## 21 STL常用容器

### 21.1 string 容器

`string` 是 C++ 标准库中表示字符串的类，本质上是对 `char*` 的封装，是一个**类**。

#### 21.1.1 string 构造函数

**函数原型**：

* `string();` //创建一个空的字符串
* `string(const char* s);` //使用字符串 s 初始化
* `string(const string& str);` //使用一个 string 对象初始化另一个 string 对象
* `string(int n, char c);` //使用 n 个字符 c 初始化

**示例**：

```c++
#include <iostream>
using namespace std;
#include <string>

void test01()
{
	string s1;           //默认构造

	const char* str = "hello world";
	string s2(str);      //使用字符串初始化

	cout << "s2 = " << s2 << endl;

	string s3(s2);       //拷贝构造
	cout << "s3 = " << s3 << endl;

	string s4(10, 'a');  //使用10个字符a初始化
	cout << "s4 = " << s4 << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.1.2 string 赋值操作

**函数原型**：

* `string& operator=(const char* s);` //char* 类型字符串赋值给当前字符串
* `string& operator=(const string &s);` //把字符串 s 赋给当前字符串
* `string& operator=(char c);` //字符赋值给当前字符串
* `string& assign(const char *s);` //把字符串 s 赋给当前字符串
* `string& assign(const char *s, int n);` //把字符串 s 的前 n 个字符赋给当前字符串
* `string& assign(const string &s);` //把字符串 s 赋给当前字符串
* `string& assign(int n, char c);` //用 n 个字符 c 赋给当前字符串

**示例**：

```c++
#include <iostream>
using namespace std;
#include <string>

void test01()
{
	string str1;
	str1 = "hello world";
	cout << "str1 = " << str1 << endl;

	string str2;
	str2 = str1;
	cout << "str2 = " << str2 << endl;

	string str3;
	str3 = 'a';
	cout << "str3 = " << str3 << endl;

	string str4;
	str4.assign("hello C++");
	cout << "str4 = " << str4 << endl;

	string str5;
	str5.assign("hello C++", 5);
	cout << "str5 = " << str5 << endl;

	string str6;
	str6.assign(str5);
	cout << "str6 = " << str6 << endl;

	string str7;
	str7.assign(5, 'x');
	cout << "str7 = " << str7 << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.1.3 string 拼接

**函数原型**：

* `string& operator+=(const char* str);`
* `string& operator+=(const char c);`
* `string& operator+=(const string& str);`
* `string& append(const char *s);`
* `string& append(const char *s, int n);`
* `string& append(const string &s);`
* `string& append(int n, char c);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <string>

void test01()
{
	string str1 = "我";

	str1 += "爱玩游戏";
	cout << "str1 = " << str1 << endl;

	str1 += ':';
	cout << "str1 = " << str1 << endl;

	string str2 = "LOL DNF";
	str1 += str2;
	cout << "str1 = " << str1 << endl;

	string str3 = "I";
	str3.append(" love ");
	str3.append("game abcde", 4);
	str3.append(str2);
	cout << "str3 = " << str3 << endl;

	str3.append(str2, 0, 3); //从下标0开始,截取3个字符
	cout << "str3 = " << str3 << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.1.4 string 查找和替换

**函数原型**：

* `int find(const string& str, int pos = 0) const;` //查找 str 第一次出现位置，从 pos 开始查找
* `int find(const char* s, int pos = 0) const;`
* `int find(const char c, int pos = 0) const;` //查找字符第一次出现位置
* `int rfind(const string& str, int pos = npos) const;` //查找 str 最后一次位置
* `int rfind(const char* s, int pos = npos) const;`
* `string& replace(int pos, int n, const string& str);` //替换从 pos 开始 n 个字符为字符串 str
* `string& replace(int pos, int n, const char* s);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <string>

void test01()
{
	//查找
	string str1 = "abcdefgde";

	int pos = str1.find("de");
	if (pos == -1)
	{
		cout << "未找到" << endl;
	}
	else
	{
		cout << "pos = " << pos << endl;
	}

	pos = str1.rfind("de");
	cout << "pos = " << pos << endl;

	//替换
	string str2 = "abcdefgde";
	str2.replace(1, 3, "1111");
	cout << "str2 = " << str2 << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

> 注意：find 查找是从左往后，rfind 从右往左。find 找到字符串返回第一次出现的位置，找不到返回 -1。

#### 21.1.5 string 字符串比较

**函数原型**：`int compare(const string &s) const;`

比较方式：按字符的 ASCII 码进行比较，大于返回 1，小于返回 -1，等于返回 0。

**示例**：

```c++
#include <iostream>
using namespace std;
#include <string>

void test01()
{
	string s1 = "hello";
	string s2 = "aello";

	int ret = s1.compare(s2);

	if (ret == 0)
	{
		cout << "s1 == s2" << endl;
	}
	else if (ret > 0)
	{
		cout << "s1 > s2" << endl;
	}
	else
	{
		cout << "s1 < s2" << endl;
	}
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.1.6 string 字符存取

**函数原型**：

* `char& operator[](int n);` //通过 [] 方式取字符
* `char& at(int n);` //通过 at 方法获取字符

**示例**：

```c++
#include <iostream>
using namespace std;
#include <string>

void test01()
{
	string str = "hello world";

	for (int i = 0; i < str.size(); i++)
	{
		cout << str[i] << " ";
	}
	cout << endl;

	for (int i = 0; i < str.size(); i++)
	{
		cout << str.at(i) << " ";
	}
	cout << endl;

	//修改单个字符
	str[0] = 'x';
	cout << "str = " << str << endl;

	str.at(1) = 'x';
	cout << "str = " << str << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.1.7 string 插入和删除

**函数原型**：

* `string& insert(int pos, const char* s);`
* `string& insert(int pos, const string& str);`
* `string& insert(int pos, int n, char c);` //在指定位置插入 n 个字符 c
* `string& erase(int pos, int n = npos);` //删除从 pos 开始的 n 个字符

**示例**：

```c++
#include <iostream>
using namespace std;
#include <string>

void test01()
{
	string str = "hello";

	str.insert(1, "111");
	cout << "str = " << str << endl;

	str.erase(1, 3); //从1号位置开始删除3个字符
	cout << "str = " << str << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.1.8 string 子串

**函数原型**：`string substr(int pos = 0, int n = npos) const;` //返回由 pos 开始的 n 个字符组成的子串

**示例**：

```c++
#include <iostream>
using namespace std;
#include <string>

void test01()
{
	string str = "abcdefg";

	string subStr = str.substr(1, 3);
	cout << "subStr = " << subStr << endl;
}

//实用操作:从邮箱地址中获取用户名信息
void test02()
{
	string email = "zhangsan@sina.com";

	//从邮箱地址中获取用户名信息
	int pos = email.find("@");
	string usrName = email.substr(0, pos);

	cout << "usrName = " << usrName << endl;
}

int main() {

	test01();
	test02();

	system("pause");

	return 0;
}
```

### 21.2 vector 容器

`vector` 的数据结构和**数组**非常相似，也称为**单端数组**，与普通数组不同的是：数组是静态空间，而 vector 可以**动态扩展**。

> 注意：vector 动态扩展并不是在原空间之后续接新空间，而是找更大的内存空间，然后将原数据拷贝到新空间，释放原空间。

#### 21.2.1 vector 构造函数

* `vector<T> v;` //采用模板实现类实现，默认构造函数
* `vector(v.begin(), v.end());` //将 v [begin()， end()) 区间中的元素拷贝给本身
* `vector(n, elem);` //构造函数将 n 个 elem 拷贝给本身
* `vector(const vector &vec);` //拷贝构造函数

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>

void printVector(vector<int>& v)
{
	for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
	{
		cout << *it << " ";
	}
	cout << endl;
}

void test01()
{
	vector<int> v1;
	for (int i = 0; i < 10; i++)
	{
		v1.push_back(i);
	}
	printVector(v1);

	//通过区间方式进行构造
	vector<int> v2(v1.begin(), v1.end());
	printVector(v2);

	//n个elem方式构造
	vector<int> v3(10, 100);
	printVector(v3);

	//拷贝构造
	vector<int> v4(v3);
	printVector(v4);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.2.2 vector 赋值操作

* `vector& operator=(const vector &vec);`
* `vector& assign(v.begin(), v.end());`
* `vector& assign(n, elem);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>

void printVector(vector<int>& v)
{
	for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
	{
		cout << *it << " ";
	}
	cout << endl;
}

void test01()
{
	vector<int> v1;
	for (int i = 0; i < 10; i++)
	{
		v1.push_back(i);
	}

	vector<int> v2;
	v2 = v1;

	vector<int> v3;
	v3.assign(v1.begin(), v1.end());

	vector<int> v4;
	v4.assign(10, 100);
	printVector(v4);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.2.3 vector 容量和大小

* `empty();` //判断容器是否为空
* `capacity();` //容器的容量
* `size();` //返回容器中元素的个数
* `resize(int num);` //重新指定容器的长度为 num，若容器变长，则以默认值填充新位置；若变短，则末尾超出容器长度的元素被删除
* `resize(int num, elem);` //重新指定容器的长度为 num，若容器变长，则以 elem 值填充新位置

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>

void test01()
{
	vector<int> v1;
	for (int i = 0; i < 10; i++)
	{
		v1.push_back(i);
	}

	if (v1.empty())
	{
		cout << "v1为空" << endl;
	}
	else
	{
		cout << "v1不为空" << endl;
		cout << "v1的容量 = " << v1.capacity() << endl;
		cout << "v1的大小 = " << v1.size() << endl;
	}

	//resize 重新指定大小
	v1.resize(15, 10); //利用重载版本,可以指定默认填充值
	//v1.resize(5);     //如果重新指定的比原来长了,默认用0填充新的位置
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.2.4 vector 插入和删除

* `push_back(ele);` //尾部插入元素 ele
* `pop_back();` //删除最后一个元素
* `insert(const_iterator pos, ele);` //迭代器指向位置 pos 插入元素 ele
* `insert(const_iterator pos, int count, ele);` //迭代器指向位置 pos 插入 count 个元素 ele
* `erase(const_iterator pos);` //删除迭代器指向的元素
* `erase(const_iterator start, const_iterator end);` //删除迭代器从 start 到 end 之间的元素
* `clear();` //删除容器中所有元素

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>

void test01()
{
	vector<int> v1;
	//尾插
	v1.push_back(10);
	v1.push_back(20);

	//头插
	v1.insert(v1.begin(), 100);

	//尾删
	v1.pop_back();

	//删除
	v1.erase(v1.begin());

	//清空
	v1.erase(v1.begin(), v1.end());
	v1.clear();
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.2.5 vector 数据存取

* `at(int idx);` //返回索引 idx 所指的数据
* `operator[];` //返回索引 idx 所指的数据
* `front();` //返回容器中第一个数据元素
* `back();` //返回容器中最后一个数据元素

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>

void test01()
{
	vector<int> v1;
	for (int i = 0; i < 10; i++)
	{
		v1.push_back(i);
	}

	for (int i = 0; i < v1.size(); i++)
	{
		cout << v1[i] << " ";
	}
	cout << endl;

	for (int i = 0; i < v1.size(); i++)
	{
		cout << v1.at(i) << " ";
	}
	cout << endl;

	cout << "v1的第一个元素为:" << v1.front() << endl;
	cout << "v1的最后一个元素为:" << v1.back() << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.2.6 vector 互换容器

**函数原型**：`swap(vec);` //将 vec 与本身的元素互换

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>

//1、基本使用
void test01()
{
	vector<int> v1;
	for (int i = 0; i < 10; i++)
	{
		v1.push_back(i);
	}

	vector<int> v2;
	for (int i = 10; i > 0; i--)
	{
		v2.push_back(i);
	}

	v1.swap(v2);
}

//2、实际用途:巧用swap可以收缩内存空间
void test02()
{
	vector<int> v;
	for (int i = 0; i < 100000; i++)
	{
		v.push_back(i);
	}

	cout << "v的容量为:" << v.capacity() << endl;
	cout << "v的大小为:" << v.size() << endl;

	v.resize(3); //重新指定大小

	cout << "v的容量为:" << v.capacity() << endl;
	cout << "v的大小为:" << v.size() << endl;

	//收缩内存
	vector<int>(v).swap(v); //匿名对象

	cout << "v的容量为:" << v.capacity() << endl;
	cout << "v的大小为:" << v.size() << endl;
}

int main() {

	test01();
	test02();

	system("pause");

	return 0;
}
```

#### 21.2.7 vector 预留空间

**函数原型**：`reserve(int len);` //容器预留 len 个元素长度，预留位置不初始化，元素不可访问

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>

void test01()
{
	vector<int> v;

	//预留空间
	v.reserve(100000);

	int num = 0; //统计开辟次数
	int* p = NULL;
	for (int i = 0; i < 100000; i++)
	{
		v.push_back(i);
		if (p != &v[0])
		{
			p = &v[0];
			num++;
		}
	}

	cout << "num = " << num << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

> 总结：如果数据量较大，可以一开始利用 reserve 预留空间。

### 21.3 deque 容器

**双端数组**，可以对头端进行插入删除操作。

deque 与 vector 区别：

* vector 对于头部的插入删除效率低，数据量越大，效率越低
* deque 相对而言，对头部的插入删除速度比 vector 快
* vector 访问元素时的速度会比 deque 快，这和两者内部实现有关

**deque 内部工作原理**：deque 内部有个**中控器**，维护每段缓冲区中的内容，缓冲区中存放真实数据，中控器维护的是每个缓冲区的地址，使得使用 deque 时像一片连续的内存空间。

#### 21.3.1 deque 构造函数

* `deque<T> deqT;` //默认构造
* `deque(beg, end);` //构造函数将 [beg， end) 区间中的元素拷贝给本身
* `deque(n, elem);` //构造函数将 n 个 elem 拷贝给本身
* `deque(const deque &deq);` //拷贝构造函数

**示例**：

```c++
#include <iostream>
using namespace std;
#include <deque>

void printDeque(const deque<int>& d)
{
	for (deque<int>::const_iterator it = d.begin(); it != d.end(); it++)
	{
		cout << *it << " ";
	}
	cout << endl;
}

void test01()
{
	deque<int> d1;
	for (int i = 0; i < 10; i++)
	{
		d1.push_back(i);
	}
	printDeque(d1);

	deque<int> d2(d1.begin(), d1.end());
	printDeque(d2);

	deque<int> d3(10, 100);
	printDeque(d3);

	deque<int> d4(d3);
	printDeque(d4);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.3.2 deque 赋值操作

* `deque& operator=(const deque &deq);`
* `assign(beg, end);`
* `assign(n, elem);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <deque>

void test01()
{
	deque<int> d1;
	for (int i = 0; i < 10; i++)
	{
		d1.push_back(i);
	}

	deque<int> d2;
	d2 = d1;

	deque<int> d3;
	d3.assign(d1.begin(), d1.end());

	deque<int> d4;
	d4.assign(10, 100);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.3.3 deque 大小操作

* `deque.empty();` //判断容器是否为空
* `deque.size();` //返回容器中元素的个数
* `deque.resize(num);` //重新指定容器的长度为 num
* `deque.resize(num, elem);` //重新指定容器的长度为 num，若变长以 elem 填充

**示例**：

```c++
#include <iostream>
using namespace std;
#include <deque>

void test01()
{
	deque<int> d;
	for (int i = 0; i < 10; i++)
	{
		d.push_back(i);
	}

	if (d.empty())
	{
		cout << "d为空" << endl;
	}
	else
	{
		cout << "d不为空" << endl;
		cout << "d的大小为:" << d.size() << endl;
	}

	//重新指定大小
	d.resize(20, 1);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.3.4 deque 插入和删除

* `push_back(elem);` //在容器尾部添加一个数据
* `push_front(elem);` //在容器头部插入一个数据
* `pop_back();` //删除容器最后一个数据
* `pop_front();` //删除容器第一个数据
* `insert(pos, elem);` //在 pos 位置插入一个 elem 元素的拷贝，返回新数据的位置
* `insert(pos, n, elem);` //在 pos 位置插入 n 个 elem 数据，无返回值
* `insert(pos, beg, end);` //在 pos 位置插入 [beg， end) 区间的数据
* `erase(beg, end);` //删除 [beg， end) 区间的数据
* `erase(pos);` //删除 pos 位置的数据，返回下一个数据的位置
* `clear();` //清空容器的所有数据

**示例**：

```c++
#include <iostream>
using namespace std;
#include <deque>

void test01()
{
	deque<int> d;
	//尾插
	d.push_back(10);
	d.push_back(20);
	//头插
	d.push_front(100);
	d.push_front(200);
	//尾删
	d.pop_back();
	//头删
	d.pop_front();

	//插入
	d.insert(d.begin(), 1000);

	//删除
	d.erase(d.begin());
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.3.5 deque 数据存取

* `at(int idx);`
* `operator[];`
* `front();` //返回容器中第一个数据元素
* `back();` //返回容器中最后一个数据元素

**示例**：

```c++
#include <iostream>
using namespace std;
#include <deque>

void test01()
{
	deque<int> d;
	d.push_back(10);
	d.push_back(20);
	d.push_front(100);
	d.push_front(200);

	for (int i = 0; i < d.size(); i++)
	{
		cout << d[i] << " ";
	}
	cout << endl;

	for (int i = 0; i < d.size(); i++)
	{
		cout << d.at(i) << " ";
	}
	cout << endl;

	cout << "first = " << d.front() << endl;
	cout << "back = " << d.back() << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.3.6 deque 排序

**函数原型**：`sort(iterator beg, iterator end);` //对 beg 和 end 区间内元素进行排序

**示例**：

```c++
#include <iostream>
using namespace std;
#include <deque>
#include <algorithm> //标准算法头文件

void printDeque(const deque<int>& d)
{
	for (deque<int>::const_iterator it = d.begin(); it != d.end(); it++)
	{
		cout << *it << " ";
	}
	cout << endl;
}

void test01()
{
	deque<int> d;
	d.push_back(10);
	d.push_back(20);
	d.push_front(100);
	d.push_front(200);

	printDeque(d);

	//排序:默认从小到大
	sort(d.begin(), d.end());
	printDeque(d);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

> 提示：deque 迭代器支持随机访问，sort 排序可以直接作用于 deque。

### 21.4 案例——评委打分

**案例描述**：有 5 名选手，每名选手由 10 名评委打分，去掉一个最高分和一个最低分，求平均分。

**实现步骤**：

1. 创建一个选手类 Person，包含姓名与平均分
2. 创建 5 名选手放到 vector 容器中
3. 遍历 vector 容器，为每名选手打分，分数存到 deque 容器中
4. sort 对 deque 中的分数排序，pop_back 去掉最高分，pop_front 去掉最低分
5. 遍历 deque 求平均分，存到选手类中

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <deque>
#include <string>
#include <algorithm>
#include <ctime>

class Person
{
public:

	Person(string name, int score)
	{
		this->m_Name = name;
		this->m_Score = score;
	}

	string m_Name; //姓名
	int m_Score;   //平均分
};

//去掉一个最高分,去掉一个最低分,再取平均分
void setScore(vector<Person>& v)
{
	for (vector<Person>::iterator it = v.begin(); it != v.end(); it++)
	{
		//将分数放入 deque 容器中
		deque<int> d;
		for (int i = 0; i < 10; i++)
		{
			int score = rand() % 41 + 60; //60~100
			d.push_back(score);
		}

		//排序
		sort(d.begin(), d.end());

		//去掉最高分和最低分
		d.pop_back();
		d.pop_front();

		//取平均分
		int sum = 0;
		for (deque<int>::iterator dit = d.begin(); dit != d.end(); dit++)
		{
			sum += *dit;
		}
		int avg = sum / d.size();

		it->m_Score = avg;
	}
}

void showScore(vector<Person>& v)
{
	for (vector<Person>::iterator it = v.begin(); it != v.end(); it++)
	{
		cout << "姓名: " << it->m_Name << " 平均分: " << it->m_Score << endl;
	}
}

int main() {

	srand((unsigned int)time(NULL));

	//创建5名选手
	vector<Person> v;
	string nameSeed = "ABCDE";
	for (int i = 0; i < 5; i++)
	{
		string name = "选手";
		name += nameSeed[i];

		Person p(name, 0);
		v.push_back(p);
	}

	//打分
	setScore(v);

	//显示最后得分
	showScore(v);

	system("pause");

	return 0;
}
```

### 21.5 stack 容器

**概念**：stack 是一种**先进后出**(First In Last Out，FILO)的数据结构，它只有一个出口。

**stack 常用接口**：

* `stack<T> stk;` //默认构造函数
* `stack(const stack &stk);` //拷贝构造函数
* `stack& operator=(const stack &stk);` //重载等号操作符
* `push(elem);` //向栈顶添加元素
* `pop();` //从栈顶移除第一个元素
* `top();` //返回栈顶元素
* `empty();` //判断堆栈是否为空
* `size();` //返回栈的大小

**示例**：

```c++
#include <iostream>
using namespace std;
#include <stack>

void test01()
{
	stack<int> s;

	//入栈
	s.push(10);
	s.push(20);
	s.push(30);

	while (!s.empty())
	{
		//输出栈顶元素
		cout << "栈顶元素为:" << s.top() << endl;
		//出栈
		s.pop();
	}

	cout << "栈的大小为:" << s.size() << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

> 总结：入栈 push、出栈 pop、返回栈顶 top、判断栈是否为空 empty、返回栈大小 size。

### 21.6 queue 容器

**概念**：queue 是一种**先进先出**(First In First Out，FIFO)的数据结构，有两个出口。

**queue 常用接口**：

* `queue<T> que;`
* `queue(const queue &que);`
* `queue& operator=(const queue &que);`
* `push(elem);` //往队尾添加元素
* `pop();` //从队头移除第一个元素
* `back();` //返回最后一个元素
* `front();` //返回第一个元素
* `empty();` //判断队列是否为空
* `size();` //返回队列的大小

**示例**：

```c++
#include <iostream>
using namespace std;
#include <queue>

void test01()
{
	queue<int> q;

	//入队
	q.push(10);
	q.push(20);
	q.push(30);

	while (!q.empty())
	{
		//输出队头元素
		cout << "队头元素为:" << q.front() << " 队尾元素为:" << q.back() << endl;
		//出队
		q.pop();
	}

	cout << "队列的大小为:" << q.size() << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

> 总结：入队 push、出队 pop、返回队头 front、返回队尾 back、判断队空 empty、返回队大小 size。

### 21.7 list 容器

**概念**：list 是一种**链式存储**的数据结构，实际上是一个**双向循环链表**，链表由一系列结点组成。

**list 的优缺点**：

* 采用动态存储分配，不会造成内存浪费和溢出
* 链表执行插入和删除操作十分方便，修改指针即可，不需要移动大量元素
* 链表灵活，但是空间(指针域)和时间(遍历)额外耗费较大

**list 有重要的性质，插入操作和删除操作都不会造成原有 list 迭代器的失效，这在 vector 是不成立的。**

#### 21.7.1 list 构造函数

* `list<T> lst;`
* `list(beg, end);`
* `list(n, elem);`
* `list(const list &lst);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <list>

void printList(const list<int>& L)
{
	for (list<int>::const_iterator it = L.begin(); it != L.end(); it++)
	{
		cout << *it << " ";
	}
	cout << endl;
}

void test01()
{
	list<int> L1;
	L1.push_back(10);
	L1.push_back(20);
	L1.push_back(30);
	L1.push_back(40);
	printList(L1);

	list<int> L2(L1.begin(), L1.end());
	printList(L2);

	list<int> L3(L2);
	printList(L3);

	list<int> L4(10, 1000);
	printList(L4);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.7.2 list 赋值和交换

* `assign(beg, end);`
* `assign(n, elem);`
* `list& operator=(const list &lst);`
* `swap(lst);` //将 lst 与本身的元素互换

**示例**：

```c++
#include <iostream>
using namespace std;
#include <list>

void test01()
{
	list<int> L1;
	L1.push_back(10);
	L1.push_back(20);

	list<int> L2;
	L2 = L1;

	list<int> L3;
	L3.assign(L2.begin(), L2.end());

	list<int> L4;
	L4.assign(10, 100);

	list<int> L5;
	L5.swap(L4);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.7.3 list 大小操作

* `size();` //返回容器中元素的个数
* `empty();` //判断容器是否为空
* `resize(num);` //重新指定容器的长度为 num
* `resize(num, elem);` //重新指定容器的长度为 num，若变长则以 elem 填充

**示例**：

```c++
#include <iostream>
using namespace std;
#include <list>

void test01()
{
	list<int> L1;
	L1.push_back(10);
	L1.push_back(20);

	cout << "大小:" << L1.size() << endl;

	L1.resize(10, 100);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.7.4 list 插入和删除

* `push_back(elem);` //在容器尾部添加一个元素
* `push_front(elem);` //在容器开头插入一个元素
* `pop_back();` //删除容器最后一个元素
* `pop_front();` //从容器开头移除第一个元素
* `insert(pos, elem);` //在 pos 位置插入 elem 元素的拷贝，返回新数据的位置
* `insert(pos, n, elem);` //在 pos 位置插入 n 个 elem 数据
* `insert(pos, beg, end);` //在 pos 位置插入 [beg， end) 区间的数据
* `erase(beg, end);` //删除 [beg， end) 区间的数据
* `erase(pos);` //删除 pos 位置的数据，返回下一个数据的位置
* `remove(elem);` //删除容器中所有与 elem 值匹配的元素
* `clear();` //移除容器的所有数据

**示例**：

```c++
#include <iostream>
using namespace std;
#include <list>

void test01()
{
	list<int> L;
	L.push_back(10);
	L.push_back(20);

	//头插
	L.push_front(100);

	//尾删
	L.pop_back();

	//头删
	L.pop_front();

	//插入
	L.insert(L.begin(), 1000);

	//删除
	list<int>::iterator it = L.begin();
	L.erase(++it);

	//移除匹配元素
	L.push_back(10000);
	L.push_back(10000);
	L.remove(10000);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.7.5 list 数据存取

**函数原型**：

* `front();` //返回第一个元素
* `back();` //返回最后一个元素

**示例**：

```c++
#include <iostream>
using namespace std;
#include <list>

void test01()
{
	list<int> L;
	L.push_back(10);
	L.push_back(20);

	cout << "first = " << L.front() << endl;
	cout << "back = " << L.back() << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

> 注意：list 容器的迭代器是双向迭代器，不支持随机访问，所以不支持 at 与 []。

#### 21.7.6 list 反转和排序

**函数原型**：

* `reverse();` //反转链表
* `sort();` //链表排序

**示例**：

```c++
#include <iostream>
using namespace std;
#include <list>
#include <algorithm>

void printList(const list<int>& L)
{
	for (list<int>::const_iterator it = L.begin(); it != L.end(); it++)
	{
		cout << *it << " ";
	}
	cout << endl;
}

bool myCompare(int val1, int val2)
{
	return val1 > val2;
}

void test01()
{
	list<int> L;
	L.push_back(90);
	L.push_back(30);
	L.push_back(20);
	L.push_back(70);
	printList(L);

	//反转容器的元素
	L.reverse();
	printList(L);

	//排序,默认从小到大
	L.sort();
	printList(L);

	//降序
	L.sort(myCompare);
	printList(L);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

> 注意：链表排序必须用成员函数 sort，不能直接用全局算法 sort，因为全局 sort 需要随机访问迭代器。

### 21.8 set 和 multiset 容器

**概念**：所有元素都会在插入时**自动被排序**。本质：**关联式容器，底层结构是用二叉树实现**。

**set 和 multiset 区别**：

* set 不允许容器中有重复的元素
* multiset 允许容器中有重复的元素

#### 21.8.1 set 构造和赋值

* `set<T> st;` //默认构造函数
* `set(const set &st);` //拷贝构造函数
* `set& operator=(const set &st);` //重载等号操作符

**示例**：

```c++
#include <iostream>
using namespace std;
#include <set>

void printSet(set<int>& s)
{
	for (set<int>::iterator it = s.begin(); it != s.end(); it++)
	{
		cout << *it << " ";
	}
	cout << endl;
}

void test01()
{
	set<int> s1;
	s1.insert(10);
	s1.insert(30);
	s1.insert(20);
	s1.insert(40);
	printSet(s1);

	//拷贝构造
	set<int> s2(s1);
	printSet(s2);

	//赋值
	set<int> s3;
	s3 = s2;
	printSet(s3);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.8.2 set 大小和交换

* `size();`
* `empty();`
* `swap(st);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <set>

void test01()
{
	set<int> s1;
	s1.insert(10);
	s1.insert(20);

	set<int> s2;
	s2.insert(100);
	s2.insert(200);

	s1.swap(s2);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.8.3 set 插入和删除

* `insert(elem);` //在容器中插入元素
* `clear();` //清除所有元素
* `erase(pos);` //删除 pos 迭代器所指的元素，返回下一个元素的迭代器
* `erase(beg, end);` //删除区间 [beg， end) 的所有元素
* `erase(elem);` //删除容器中值为 elem 的元素

**示例**：

```c++
#include <iostream>
using namespace std;
#include <set>

void test01()
{
	set<int> s;
	s.insert(10);
	s.insert(20);
	s.insert(30);

	//删除
	s.erase(s.begin());

	//删除区间
	s.erase(s.begin(), s.end());

	s.clear();
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.8.4 set 查找和统计

* `find(key);` //查找 key 是否存在，若存在，返回该键的元素的迭代器；若不存在，返回 set.end()
* `count(key);` //统计 key 的元素个数(set 中只能是 0 或 1)

**示例**：

```c++
#include <iostream>
using namespace std;
#include <set>

void test01()
{
	set<int> s;
	s.insert(10);
	s.insert(20);
	s.insert(30);

	set<int>::iterator pos = s.find(30);

	if (pos != s.end())
	{
		cout << "找到元素:" << *pos << endl;
	}
	else
	{
		cout << "未找到元素" << endl;
	}

	cout << "count(20) = " << s.count(20) << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.8.5 set 与 multiset 区别

**示例**：set 插入时用 pair 判断是否成功，multiset 允许重复

```c++
#include <iostream>
using namespace std;
#include <set>

void test01()
{
	set<int> s;
	//insert 返回 pair<iterator, bool>
	pair<set<int>::iterator, bool> ret = s.insert(10);

	if (ret.second)
	{
		cout << "第一次插入成功" << endl;
	}
	else
	{
		cout << "第一次插入失败" << endl;
	}

	ret = s.insert(10);
	if (ret.second)
	{
		cout << "第二次插入成功" << endl;
	}
	else
	{
		cout << "第二次插入失败" << endl;
	}
}

void test02()
{
	multiset<int> ms;
	//multiset 允许插入重复值
	ms.insert(10);
	ms.insert(10);
	ms.insert(10);
}

int main() {

	test01();
	test02();

	system("pause");

	return 0;
}
```

#### 21.8.6 pair 对组

**概念**：成对出现的数据，利用对组可以返回两个数据。

**两种创建方式**：

* `pair<type, type> p ( value1, value2 );`
* `pair<type, type> p = make_pair( value1, value2 );`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <string>

void test01()
{
	//第一种方式
	pair<string, int> p(string("Tom"), 20);
	cout << "姓名: " << p.first << " 年龄: " << p.second << endl;

	//第二种方式
	pair<string, int> p2 = make_pair("Jerry", 10);
	cout << "姓名: " << p2.first << " 年龄: " << p2.second << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

### 21.9 map 和 multimap 容器

**概念**：

* map 中所有元素都是 **pair**
* pair 中第一个元素为 **key**(键值)，第二个元素为 **value**(实值)
* **所有元素都会根据元素的键值自动排序**

**本质**：map/multimap 属于**关联式容器**，底层结构是用**二叉树**实现。

**优点**：可以根据 key 值快速找到 value 值。

**map 和 multimap 区别**：

* map 不允许容器中有重复 key 值元素
* multimap 允许容器中有重复 key 值元素

#### 21.9.1 map 构造和赋值

* `map<T1, T2> mp;`
* `map(const map &mp);`
* `map& operator=(const map &mp);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <map>

void printMap(map<int, int>& m)
{
	for (map<int, int>::iterator it = m.begin(); it != m.end(); it++)
	{
		cout << "key = " << it->first << " value = " << it->second << endl;
	}
}

void test01()
{
	map<int, int> m;
	m.insert(pair<int, int>(1, 10));
	m.insert(pair<int, int>(3, 30));
	m.insert(pair<int, int>(2, 20));
	m.insert(pair<int, int>(4, 40));
	printMap(m);

	//拷贝构造
	map<int, int> m2(m);
	printMap(m2);

	//赋值
	map<int, int> m3;
	m3 = m2;
	printMap(m3);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.9.2 map 大小和交换

* `size();`
* `empty();`
* `swap(st);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <map>

void test01()
{
	map<int, int> m;
	m.insert(pair<int, int>(1, 10));
	m.insert(pair<int, int>(2, 20));

	map<int, int> m2;
	m2.insert(pair<int, int>(3, 30));

	m2.swap(m);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.9.3 map 插入和删除

**函数原型**：

* `insert(elem);` //在容器中插入元素
* `clear();` //清除所有元素
* `erase(pos);` //删除 pos 迭代器所指的元素，返回下一个元素的迭代器
* `erase(beg, end);` //删除区间 [beg， end) 的所有元素
* `erase(key);` //删除容器中值为 key 的元素

**示例**：

```c++
#include <iostream>
using namespace std;
#include <map>

void test01()
{
	map<int, int> m;

	//第一种插入方式
	m.insert(pair<int, int>(1, 10));
	//第二种插入方式
	m.insert(make_pair(2, 20));
	//第三种插入方式
	m.insert(map<int, int>::value_type(3, 30));
	//第四种插入方式:[] 不建议用它插入
	m[4] = 40;

	//删除
	m.erase(m.begin());
	m.erase(3);

	//清空
	m.erase(m.begin(), m.end());
	m.clear();
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 21.9.4 map 查找和统计

* `find(key);` //查找 key 是否存在，若存在返回该键的元素的迭代器；若不存在返回 map.end()
* `count(key);` //统计 key 的元素个数

**示例**：

```c++
#include <iostream>
using namespace std;
#include <map>

void test01()
{
	map<int, int> m;
	m.insert(pair<int, int>(1, 10));
	m.insert(pair<int, int>(2, 20));

	map<int, int>::iterator pos = m.find(2);

	if (pos != m.end())
	{
		cout << "找到元素 key = " << (*pos).first << " value = " << (*pos).second << endl;
	}
	else
	{
		cout << "未找到元素" << endl;
	}

	//统计 map 中 count 只能是 0 或 1
	cout << "count = " << m.count(2) << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

> 总结：STL 常用容器各有所长——string 处理文本，vector 访问快，deque 双端灵活，list 插入删除快，set/map 有序，stack/queue 各有纪律，实际使用按场景取舍。
