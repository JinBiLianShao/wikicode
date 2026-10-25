---
title: 二十二.STL函数对象
author: 连思鑫
tags:
  - c++
  - STL
categories:
  - ..
  - C++
  - C++提高编程
  - ''
date: 2026-10-25 18:14:00
---

## 22 STL函数对象

### 22.1 函数对象概念

**概念**：

* 重载**函数调用操作符**的类，其对象常称为**函数对象**
* **函数对象**使用重载的 `()` 时，行为类似函数调用，也叫**仿函数**

**本质**：函数对象(仿函数)是一个**类**，不是函数。

**特点**：

* 函数对象在使用时，可以像普通函数那样调用，可以有参数，可以有返回值
* 函数对象超出普通函数的概念，函数对象可以有自己的状态
* 函数对象可以作为参数传递

### 22.2 函数对象使用

**示例**：

```c++
#include <iostream>
using namespace std;
#include <string>

//1、函数对象在使用时,可以像普通函数那样调用,可以有参数,可以有返回值
class MyAdd
{
public:

	int operator()(int v1, int v2)
	{
		return v1 + v2;
	}
};

void test01()
{
	MyAdd myAdd;
	cout << myAdd(10, 10) << endl;
}

//2、函数对象可以有自己的状态
class MyPrint
{
public:

	MyPrint()
	{
		this->count = 0;
	}

	void operator()(string test)
	{
		cout << test << endl;
		this->count++; //统计使用次数
	}

	int count; //内部自己的状态
};

void test02()
{
	MyPrint myPrint;
	myPrint("hello world");
	myPrint("hello world");
	myPrint("hello world");

	cout << "myPrint 调用次数为: " << myPrint.count << endl;
}

//3、函数对象可以作为参数传递
void doPrint(MyPrint& mp, string test)
{
	mp(test);
}

void test03()
{
	MyPrint myPrint;
	doPrint(myPrint, "Hello C++");
}

int main() {

	test01();
	test02();
	test03();

	system("pause");

	return 0;
}
```

> 总结：仿函数写法非常灵活，可以作为参数进行传递。

### 22.3 谓词

**概念**：

* 返回 **bool 类型**的仿函数称为**谓词**
* 如果 operator() 接受一个参数，那么叫做**一元谓词**
* 如果 operator() 接受两个参数，那么叫做**二元谓词**

**示例**：一元谓词

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

//1、一元谓词
class GreaterFive
{
public:

	bool operator()(int val)
	{
		return val > 5;
	}
};

void test01()
{
	vector<int> v;
	for (int i = 0; i < 10; i++)
	{
		v.push_back(i);
	}

	//查找容器中,有没有大于5的数字
	//GreaterFive() 匿名函数对象
	vector<int>::iterator it = find_if(v.begin(), v.end(), GreaterFive());

	if (it == v.end())
	{
		cout << "未找到" << endl;
	}
	else
	{
		cout << "找到了大于5的数字为: " << *it << endl;
	}
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

**示例**：二元谓词

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

//二元谓词
class MyCompare
{
public:

	bool operator()(int v1, int v2)
	{
		return v1 > v2;
	}
};

void test01()
{
	vector<int> v;
	v.push_back(10);
	v.push_back(40);
	v.push_back(20);
	v.push_back(30);
	v.push_back(50);

	//默认从小到大
	sort(v.begin(), v.end());

	//使用函数对象改变算法策略,变为从大到小
	sort(v.begin(), v.end(), MyCompare());

	for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
	{
		cout << *it << " ";
	}
	cout << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

> 总结：谓词用于改变算法策略，让算法按自己的规则工作。

### 22.4 内建函数对象

**概念**：STL 内建了一些函数对象，分为：**算术仿函数**、**关系仿函数**、**逻辑仿函数**。这些仿函数所产生的对象，用法和一般函数完全相同。使用内建函数对象，需要引入头文件 `#include <functional>`。

#### 22.4.1 算术仿函数

**功能描述**：实现四则运算。其中 negate 是一元运算，其他都是二元运算。

| 仿函数原型                     | 功能       |
| ------------------------------ | ---------- |
| `template<class T> T plus<T>`  | 加法仿函数 |
| `template<class T> T minus<T>` | 减法仿函数 |
| `template<class T> T multiplies<T>` | 乘法仿函数 |
| `template<class T> T divides<T>` | 除法仿函数 |
| `template<class T> T modulus<T>` | 取模仿函数 |
| `template<class T> T negate<T>` | 取反仿函数 |

**示例**：

```c++
#include <iostream>
using namespace std;
#include <functional>

//negate 一元仿函数
void test01()
{
	negate<int> n;
	cout << n(50) << endl;
}

//plus 二元仿函数
void test02()
{
	plus<int> p;
	cout << p(10, 20) << endl;
}

int main() {

	test01();
	test02();

	system("pause");

	return 0;
}
```

#### 22.4.2 关系仿函数

**功能描述**：实现关系对比。

| 仿函数原型                                  | 功能       |
| ------------------------------------------- | ---------- |
| `template<class T> bool equal_to<T>`        | 等于       |
| `template<class T> bool not_equal_to<T>`    | 不等于     |
| `template<class T> bool greater<T>`         | 大于       |
| `template<class T> bool greater_equal<T>`   | 大于等于   |
| `template<class T> bool less<T>`            | 小于       |
| `template<class T> bool less_equal<T>`      | 小于等于   |

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>
#include <functional>

void test01()
{
	vector<int> v;
	v.push_back(10);
	v.push_back(30);
	v.push_back(20);
	v.push_back(40);
	v.push_back(50);

	//默认从小到大
	sort(v.begin(), v.end());

	//使用内建函数对象,从大到小
	sort(v.begin(), v.end(), greater<int>());

	for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
	{
		cout << *it << " ";
	}
	cout << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

> 提示：最常用的内建关系仿函数是 greater 和 less。

#### 22.4.3 逻辑仿函数

**功能描述**：实现逻辑运算。

| 仿函数原型                              | 功能       |
| --------------------------------------- | ---------- |
| `template<class T> bool logical_and<T>` | 逻辑与     |
| `template<class T> bool logical_or<T>`  | 逻辑或     |
| `template<class T> bool logical_not<T>` | 逻辑非     |

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>
#include <functional>

void test01()
{
	vector<bool> v;
	v.push_back(true);
	v.push_back(false);
	v.push_back(true);
	v.push_back(false);

	//利用 transform 将容器 v 搬运到容器 v2 中
	vector<bool> v2;
	v2.resize(v.size());

	transform(v.begin(), v.end(), v2.begin(), logical_not<bool>());

	for (vector<bool>::iterator it = v2.begin(); it != v2.end(); it++)
	{
		cout << *it << " ";
	}
	cout << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

> 总结：逻辑仿函数实际应用较少，了解即可。

### 22.5 适配器

**概念**：适配器(也叫配接器)是对已有函数对象进行再次封装，使其满足新的接口要求。

#### 22.5.1 函数对象适配器

**示例**：利用 bind1st 和 bind2nd 绑定参数

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>
#include <functional>

//bind2nd 绑定第二个参数
void test01()
{
	vector<int> v;
	v.push_back(10);
	v.push_back(20);
	v.push_back(30);
	v.push_back(40);
	v.push_back(50);

	//找到第一个大于 50 的数字
	vector<int>::iterator it = find_if(v.begin(), v.end(), bind2nd(greater<int>(), 50));

	if (it == v.end())
	{
		cout << "未找到" << endl;
	}
	else
	{
		cout << "找到: " << *it << endl;
	}
}

//bind1st 绑定第一个参数,即小于 50
void test02()
{
	vector<int> v;
	v.push_back(10);
	v.push_back(20);
	v.push_back(30);
	v.push_back(40);
	v.push_back(50);

	vector<int>::iterator it = find_if(v.begin(), v.end(), bind1st(greater<int>(), 50));

	if (it == v.end())
	{
		cout << "未找到" << endl;
	}
	else
	{
		cout << "找到: " << *it << endl;
	}
}

int main() {

	test01();
	test02();

	system("pause");

	return 0;
}
```

#### 22.5.2 取反适配器

**示例**：not1 与 not2 取反

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>
#include <functional>

void test01()
{
	vector<int> v;
	v.push_back(10);
	v.push_back(20);
	v.push_back(30);
	v.push_back(40);
	v.push_back(50);

	//not1 对一元函数对象取反,查找不小于 5 的元素
	vector<int>::iterator it = find_if(v.begin(), v.end(), not1(bind2nd(greater<int>(), 5)));

	if (it == v.end())
	{
		cout << "未找到" << endl;
	}
	else
	{
		cout << "找到: " << *it << endl;
	}
}

void test02()
{
	vector<int> v;
	v.push_back(10);
	v.push_back(20);
	v.push_back(30);
	v.push_back(40);
	v.push_back(50);

	//统计大于 5 的元素个数
	int num = count_if(v.begin(), v.end(), not1(bind2nd(greater<int>(), 5)));
	cout << "num = " << num << endl;
}

int main() {

	test01();
	test02();

	system("pause");

	return 0;
}
```

> 注意：bind1st、bind2nd、not1、not2 在新标准中已被 lambda 表达式取代，但作为理解仿函数与适配器的基础，仍然值得掌握。
