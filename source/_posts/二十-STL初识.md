---
title: 二十.STL初识
author: 连思鑫
tags:
  - c++
  - STL
categories:
  - ..
  - C++
  - C++提高编程
  - ''
date: 2026-10-25 18:12:00
---

## 20 STL初识

### 20.1 STL 的诞生

* 长久以来，软件界一直希望建立一种可重复利用的东西
* C++ 的**面向对象**和**泛型编程**思想，目的就是**复用性的提升**
* 大多数情况下，数据结构和算法都未能有一套标准，导致被迫从事大量重复工作
* 为了建立数据结构和算法的一套标准，诞生了 **STL**

### 20.2 STL 基本概念

* STL(Standard Template Library，**标准模板库**)
* STL 从广义上分为：**容器(container)**、**算法(algorithm)**、**迭代器(iterator)**
* **容器**和**算法**之间通过**迭代器**进行无缝连接
* STL 几乎所有的代码都采用了模板类或者模板函数

### 20.3 STL 六大组件

STL 大体分为六大组件，分别是：**容器、算法、迭代器、仿函数、适配器(配接器)、空间配置器**。

1. **容器**：各种数据结构，如 vector、list、deque、set、map 等，用来存放数据
2. **算法**：各种常用的算法，如 sort、find、copy、for_each 等
3. **迭代器**：扮演了指针的角色，是容器与算法之间的胶合剂
4. **仿函数**：行为类似函数，可作为算法的某种策略
5. **适配器**：一种用来修饰容器或者仿函数或迭代器接口的东西
6. **空间配置器**：负责空间的配置与管理

### 20.4 STL 中容器、算法、迭代器

**容器**：置物之所也。STL 容器就是将运用最广泛的一些数据结构实现出来，常用的数据结构有数组、链表、树、栈、队列、集合、映射表等。这些容器分为**序列式容器**和**关联式容器**两种：

* 序列式容器：强调值的排序，序列式容器中的每个元素均有固定的位置
* 关联式容器：二叉树结构，各元素之间没有严格的物理上的顺序关系

**算法**：问题之解法也。有限的步骤，解决逻辑或数学上的问题。算法分为**质变算法**和**非质变算法**：

* 质变算法：是指运算过程中会更改区间内的元素的内容，如拷贝、替换、删除等等
* 非质变算法：是指运算过程中不会更改区间内的元素内容，如查找、计数、遍历、寻找极值等等

**迭代器**：容器和算法之间粘合剂，提供一种方法，使之能够依序寻访某个容器所含的各个元素，而又无需暴露该容器的内部表示方式。每个容器都有自己专属的迭代器。

**迭代器种类**：

| 种类           | 功能                                         | 支持运算                           |
| -------------- | -------------------------------------------- | ---------------------------------- |
| 输入迭代器     | 对数据的只读访问                             | 只读，支持 ++、==、!=              |
| 输出迭代器     | 对数据的只写访问                             | 只写，支持 ++                       |
| 前向迭代器     | 读写操作，并能向前推进迭代器                  | 读写，支持 ++、==、!=              |
| 双向迭代器     | 读写操作，并能向前和向后操作                  | 读写，支持 ++、--                  |
| 随机访问迭代器 | 读写操作，可以以跳跃的方式访问任意数据        | 读写，支持 ++、--、[n]、-n、<、<=、>、>= |

常用的容器中迭代器种类为双向迭代器，和随机访问迭代器。

#### 20.4.1 vector 存放内置数据类型

容器：`vector`；算法：`for_each`；迭代器：`vector<int>::iterator`。

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

void myPrint(int val)
{
	cout << val << endl;
}

void test01()
{
	//创建vector容器对象,并且通过模板参数指定容器中存放的数据的类型
	vector<int> v;

	//向容器中放数据
	v.push_back(10);
	v.push_back(20);
	v.push_back(30);
	v.push_back(40);

	//每一个容器都有自己的迭代器,迭代器是用来遍历容器中的元素
	//v.begin()返回迭代器,这个迭代器指向容器中第一个数据
	//v.end()返回迭代器,这个迭代器指向容器元素的最后一个元素的下一个位置
	//vector<int>::iterator 拿到 vector<int> 这种容器的迭代器类型

	vector<int>::iterator pBegin = v.begin();
	vector<int>::iterator pEnd = v.end();

	//第一种遍历方式
	while (pBegin != pEnd)
	{
		cout << *pBegin << endl;
		pBegin++;
	}

	//第二种遍历方式
	for (vector<int>::iterator it = v.begin(); it != v.end(); it++)
	{
		cout << *it << endl;
	}

	//第三种遍历方式
	//使用STL提供标准遍历算法,头文件 algorithm
	for_each(v.begin(), v.end(), myPrint);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 20.4.2 vector 存放自定义数据类型

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <string>

//自定义数据类型
class Person
{
public:

	Person(string name, int age)
	{
		mName = name;
		mAge = age;
	}

	string mName;
	int mAge;
};

//存放对象
void test01()
{
	vector<Person> v;

	//创建数据
	Person p1("aaa", 10);
	Person p2("bbb", 20);
	Person p3("ccc", 30);
	Person p4("ddd", 40);
	Person p5("eee", 50);

	//向容器中添加数据
	v.push_back(p1);
	v.push_back(p2);
	v.push_back(p3);
	v.push_back(p4);
	v.push_back(p5);

	//遍历容器中的数据
	for (vector<Person>::iterator it = v.begin(); it != v.end(); it++)
	{
		//解引用找到的是 Person 类型,(*it).mName
		cout << "姓名: " << (*it).mName << " 年龄: " << (*it).mAge << endl;
	}
}

//存放对象指针
void test02()
{
	vector<Person*> v;

	//创建数据
	Person p1("aaa", 10);
	Person p2("bbb", 20);
	Person p3("ccc", 30);
	Person p4("ddd", 40);
	Person p5("eee", 50);

	//向容器中添加数据
	v.push_back(&p1);
	v.push_back(&p2);
	v.push_back(&p3);
	v.push_back(&p4);
	v.push_back(&p5);

	//遍历容器
	for (vector<Person*>::iterator it = v.begin(); it != v.end(); it++)
	{
		//(*it) 是 Person* 类型
		Person* p = (*it);
		cout << "姓名: " << p->mName << " 年龄: " << p->mAge << endl;
	}
}

int main() {

	test01();
	test02();

	system("pause");

	return 0;
}
```

### 20.5 容器嵌套容器

容器嵌套容器，可以将多维数据存放在一个容器中统一管理。

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>

//容器嵌套容器
void test01()
{
	//创建大容器
	vector<vector<int>> v;

	//创建小容器
	vector<int> v1;
	vector<int> v2;
	vector<int> v3;
	vector<int> v4;

	//向小容器中添中数据
	for (int i = 0; i < 4; i++)
	{
		v1.push_back(i + 1);
		v2.push_back(i + 2);
		v3.push_back(i + 3);
		v4.push_back(i + 4);
	}

	//将小容器插入到大容器中
	v.push_back(v1);
	v.push_back(v2);
	v.push_back(v3);
	v.push_back(v4);

	//通过大容器,把所有数据遍历一遍
	for (vector<vector<int>>::iterator it = v.begin(); it != v.end(); it++)
	{
		//(*it) 是 vector<int> 类型
		for (vector<int>::iterator vit = (*it).begin(); vit != (*it).end(); vit++)
		{
			cout << *vit << " ";
		}
		cout << endl;
	}
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

> 总结：STL 的容器、算法、迭代器三者通过模板与迭代器紧密结合，为后续的常用容器学习打下了基础。
