---
title: 二十三.STL常用算法
author: 连思鑫
tags:
  - c++
  - STL
categories:
  - ..
  - C++
  - C++提高编程
  - ''
date: 2026-10-25 18:15:00
---

## 23 STL常用算法

STL 提供了大量的算法，主要用于容器中的数据操作，例如查找、排序、拷贝、替换、算术生成和集合运算等。算法需要包含头文件 `#include <algorithm>`，算术生成算法需要 `#include <numeric>`，函数对象需要 `#include <functional>`。

> 注意：大多数算法都接受一对迭代器区间 [beg， end)，返回迭代器时如果没找到目标，一般返回 end() 或目标区间的结束位置。

### 23.1 常用遍历算法

#### 23.1.1 for_each

**作用**：遍历容器，把容器中的数据逐个传递给函数或函数对象处理。

**函数原型**：`for_each(iterator beg, iterator end, _func);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

//普通函数
void print01(int val)
{
	cout << val << " ";
}

//函数对象
class print02
{
public:

	void operator()(int val)
	{
		cout << val << " ";
	}
};

void test01()
{
	vector<int> v;
	for (int i = 0; i < 10; i++)
	{
		v.push_back(i);
	}

	//普通函数
	for_each(v.begin(), v.end(), print01);
	cout << endl;

	//函数对象
	for_each(v.begin(), v.end(), print02());
	cout << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 23.1.2 transform

**作用**：搬运容器到另一个容器中，搬运过程中可以按函数规则变换数据。

**函数原型**：

* `transform(iterator beg1, iterator end1, iterator beg2, _func);`
* 二元运算版本：`transform(beg1, end1, beg2, target, _func);`

> 注意：目标容器需要**提前开辟空间**，否则会崩溃。

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

//一元运算:搬运并取反? 这里是原样搬运
class Transform
{
public:

	int operator()(int v)
	{
		return v;
	}
};

//二元运算:两个容器对应元素相加
class Transform2
{
public:

	int operator()(int v1, int v2)
	{
		return v1 + v2;
	}
};

void test01()
{
	vector<int> v;
	for (int i = 0; i < 10; i++)
	{
		v.push_back(i);
	}

	vector<int> vTarget;
	//目标容器需要提前开辟空间
	vTarget.resize(v.size());

	transform(v.begin(), v.end(), vTarget.begin(), Transform());
}

void test02()
{
	vector<int> v1;
	for (int i = 0; i < 10; i++)
	{
		v1.push_back(i);
	}

	vector<int> v2;
	for (int i = 0; i < 10; i++)
	{
		v2.push_back(i + 100);
	}

	vector<int> vTarget;
	vTarget.resize(v1.size());

	transform(v1.begin(), v1.end(), v2.begin(), vTarget.begin(), Transform2());
}

int main() {

	test01();
	test02();

	system("pause");

	return 0;
}
```

### 23.2 常用查找算法

#### 23.2.1 find

**作用**：查找指定元素，找到返回指定元素的迭代器，找不到返回结束迭代器 end()。

**函数原型**：`find(iterator beg, iterator end, value);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>
#include <string>

//查找内置数据类型
void test01()
{
	vector<int> v;
	for (int i = 0; i < 10; i++)
	{
		v.push_back(i);
	}

	vector<int>::iterator it = find(v.begin(), v.end(), 5);

	if (it == v.end())
	{
		cout << "没有找到" << endl;
	}
	else
	{
		cout << "找到: " << *it << endl;
	}
}

//查找自定义数据类型
class Person
{
public:

	Person(string name, int age)
	{
		this->m_Name = name;
		this->m_Age = age;
	}

	//重载 == 让 find 知道如何比较 Person
	bool operator==(const Person& p)
	{
		return this->m_Name == p.m_Name && this->m_Age == p.m_Age;
	}

	string m_Name;
	int m_Age;
};

void test02()
{
	vector<Person> v;
	Person p1("aaa", 10);
	Person p2("bbb", 20);
	Person p3("ccc", 30);
	Person p4("ddd", 40);

	v.push_back(p1);
	v.push_back(p2);
	v.push_back(p3);
	v.push_back(p4);

	Person pp("bbb", 20);

	vector<Person>::iterator it = find(v.begin(), v.end(), pp);

	if (it == v.end())
	{
		cout << "没有找到" << endl;
	}
	else
	{
		cout << "找到姓名:" << it->m_Name << " 年龄:" << it->m_Age << endl;
	}
}

int main() {

	test01();
	test02();

	system("pause");

	return 0;
}
```

#### 23.2.2 find_if

**作用**：按条件查找元素，找到返回第一个满足条件的元素迭代器。

**函数原型**：`find_if(iterator beg, iterator end, _Pred);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>
#include <string>

//查找内置数据类型:找大于5的数
void test01()
{
	vector<int> v;
	for (int i = 0; i < 10; i++)
	{
		v.push_back(i);
	}

	//谓词:大于5
	class GreaterFive
	{
	public:
		bool operator()(int val)
		{
			return val > 5;
		}
	};

	vector<int>::iterator it = find_if(v.begin(), v.end(), GreaterFive());

	if (it == v.end())
	{
		cout << "没有找到" << endl;
	}
	else
	{
		cout << "找到大于5的数字:" << *it << endl;
	}
}

//查找自定义数据类型:找年龄大于20的人
class Person
{
public:

	Person(string name, int age)
	{
		this->m_Name = name;
		this->m_Age = age;
	}

	string m_Name;
	int m_Age;
};

class Greater20
{
public:

	bool operator()(Person& p)
	{
		return p.m_Age > 20;
	}
};

void test02()
{
	vector<Person> v;
	Person p1("aaa", 10);
	Person p2("bbb", 20);
	Person p3("ccc", 30);
	Person p4("ddd", 40);

	v.push_back(p1);
	v.push_back(p2);
	v.push_back(p3);
	v.push_back(p4);

	vector<Person>::iterator it = find_if(v.begin(), v.end(), Greater20());

	if (it == v.end())
	{
		cout << "没有找到" << endl;
	}
	else
	{
		cout << "找到姓名:" << it->m_Name << " 年龄:" << it->m_Age << endl;
	}
}

int main() {

	test01();
	test02();

	system("pause");

	return 0;
}
```

#### 23.2.3 adjacent_find

**作用**：查找**相邻重复**元素，返回相邻元素的第一个位置的迭代器。

**函数原型**：`adjacent_find(iterator beg, iterator end);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

void test01()
{
	vector<int> v;
	v.push_back(10);
	v.push_back(20);
	v.push_back(30);
	v.push_back(30);
	v.push_back(40);

	vector<int>::iterator it = adjacent_find(v.begin(), v.end());

	if (it == v.end())
	{
		cout << "没有找到相邻重复元素" << endl;
	}
	else
	{
		cout << "找到相邻重复元素:" << *it << endl;
	}
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 23.2.4 binary_search

**作用**：查找指定元素是否存在，返回 **bool**。

> 注意：**必须在有序序列中**使用，无序序列会得到未知结果。

**函数原型**：`bool binary_search(iterator beg, iterator end, value);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

void test01()
{
	vector<int> v;
	for (int i = 0; i < 10; i++)
	{
		v.push_back(i);
	}

	bool ret = binary_search(v.begin(), v.end(), 6);

	if (ret)
	{
		cout << "找到了" << endl;
	}
	else
	{
		cout << "未找到" << endl;
	}
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 23.2.5 count

**作用**：统计元素个数。

**函数原型**：`count(iterator beg, iterator end, value);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>
#include <string>

void test01()
{
	vector<int> v;
	v.push_back(10);
	v.push_back(40);
	v.push_back(30);
	v.push_back(40);
	v.push_back(20);
	v.push_back(40);

	int num = count(v.begin(), v.end(), 40);
	cout << "40 的个数为:" << num << endl;
}

//自定义类型统计需要重载 ==
class Person
{
public:

	Person(string name, int age)
	{
		this->m_Name = name;
		this->m_Age = age;
	}

	bool operator==(const Person& p)
	{
		return this->m_Age == p.m_Age;
	}

	string m_Name;
	int m_Age;
};

void test02()
{
	vector<Person> v;
	Person p1("刘备", 35);
	Person p2("关羽", 35);
	Person p3("张飞", 35);
	Person p4("赵云", 30);
	Person p5("曹操", 25);

	v.push_back(p1);
	v.push_back(p2);
	v.push_back(p3);
	v.push_back(p4);
	v.push_back(p5);

	Person p("诸葛亮", 35);

	int num = count(v.begin(), v.end(), p);
	cout << "和诸葛亮同岁的人数:" << num << endl;
}

int main() {

	test01();
	test02();

	system("pause");

	return 0;
}
```

#### 23.2.6 count_if

**作用**：按条件统计元素个数。

**函数原型**：`count_if(iterator beg, iterator end, _Pred);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

//统计大于5的元素个数
class Greater5
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

	int num = count_if(v.begin(), v.end(), Greater5());
	cout << "大于5的个数为:" << num << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

### 23.3 常用排序算法

#### 23.3.1 sort

**作用**：对容器内元素进行排序。

**函数原型**：

* `sort(iterator beg, iterator end);`
* `sort(iterator beg, iterator end, _Pred);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>
#include <functional>

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
	vector<int> v;
	v.push_back(10);
	v.push_back(30);
	v.push_back(50);
	v.push_back(20);
	v.push_back(40);

	//默认升序
	sort(v.begin(), v.end());
	printVector(v);

	//降序,用内建函数对象
	sort(v.begin(), v.end(), greater<int>());
	printVector(v);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 23.3.2 random_shuffle

**作用**：洗牌，指定范围内的元素随机调整次序。

**函数原型**：`random_shuffle(iterator beg, iterator end);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>
#include <ctime>

void test01()
{
	srand((unsigned int)time(NULL));

	vector<int> v;
	for (int i = 0; i < 10; i++)
	{
		v.push_back(i);
	}

	random_shuffle(v.begin(), v.end());
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

> 注意：random_shuffle 在 C++17 中被弃用，可用 std：：shuffle 替代；学习阶段了解其作用即可。

#### 23.3.3 merge

**作用**：两个容器元素合并，并存储到另一个容器中。两个容器必须**有序**。

**函数原型**：`merge(iterator beg1, iterator end1, iterator beg2, iterator end2, iterator dest);`

> 注意：目标容器需要提前开辟空间。

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

void test01()
{
	vector<int> v1;
	vector<int> v2;

	for (int i = 0; i < 5; i++)
	{
		v1.push_back(i);
		v2.push_back(i + 5);
	}

	vector<int> vTarget;
	//目标容器提前开辟空间
	vTarget.resize(v1.size() + v2.size());

	merge(v1.begin(), v1.end(), v2.begin(), v2.end(), vTarget.begin());
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 23.3.4 reverse

**作用**：将容器内元素反转。

**函数原型**：`reverse(iterator beg, iterator end);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

void test01()
{
	vector<int> v;
	for (int i = 0; i < 10; i++)
	{
		v.push_back(i);
	}

	reverse(v.begin(), v.end());
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

### 23.4 常用拷贝和替换算法

#### 23.4.1 copy

**作用**：容器内指定范围的元素拷贝到另一容器中。

**函数原型**：`copy(iterator beg, iterator end, iterator dest);`

> 注意：目标容器需要提前开辟空间。

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

void test01()
{
	vector<int> v1;
	for (int i = 0; i < 10; i++)
	{
		v1.push_back(i);
	}

	vector<int> v2;
	v2.resize(v1.size());

	copy(v1.begin(), v1.end(), v2.begin());
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 23.4.2 replace

**作用**：将容器内指定范围的旧元素修改为新元素。

**函数原型**：`replace(iterator beg, iterator end, oldvalue, newvalue);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

void test01()
{
	vector<int> v;
	v.push_back(20);
	v.push_back(30);
	v.push_back(20);
	v.push_back(40);
	v.push_back(50);

	//将20替换为2000
	replace(v.begin(), v.end(), 20, 2000);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 23.4.3 replace_if

**作用**：将区间内满足条件的元素，替换成指定元素。

**函数原型**：`replace_if(iterator beg, iterator end, _pred, newvalue);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

//谓词:大于30
class Greater30
{
public:

	bool operator()(int val)
	{
		return val > 30;
	}
};

void test01()
{
	vector<int> v;
	v.push_back(10);
	v.push_back(40);
	v.push_back(20);
	v.push_back(40);
	v.push_back(30);
	v.push_back(50);

	//将大于30的元素替换为3000
	replace_if(v.begin(), v.end(), Greater30(), 3000);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 23.4.4 swap

**作用**：互换两个容器。

**函数原型**：`swap(container c1, container c2);` //互换 c1 与 c2 的元素，两个容器类型必须相同

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

void test01()
{
	vector<int> v1;
	vector<int> v2;
	for (int i = 0; i < 5; i++)
	{
		v1.push_back(i);
		v2.push_back(i + 100);
	}

	swap(v1, v2);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

### 23.5 常用算术生成算法

> 注意：算术生成算法属于小型算法，使用时包含的头文件为 `#include <numeric>`。

#### 23.5.1 accumulate

**作用**：计算区间内容器元素累计总和。

**函数原型**：`accumulate(iterator beg, iterator end, value);` //value 为起始累加值

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <numeric>

void test01()
{
	vector<int> v;
	for (int i = 0; i <= 100; i++)
	{
		v.push_back(i);
	}

	int total = accumulate(v.begin(), v.end(), 0);
	cout << "total = " << total << endl;
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

#### 23.5.2 fill

**作用**：向容器中填充指定的元素。

**函数原型**：`fill(iterator beg, iterator end, value);`

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <numeric>
#include <algorithm>

void test01()
{
	vector<int> v;
	v.resize(10); //为空容器预留位置,才能填充

	//填充
	fill(v.begin(), v.end(), 100);
}

int main() {

	test01();

	system("pause");

	return 0;
}
```

### 23.6 常用集合算法

> 注意：本节算法都要求**两个容器是有序序列**；目标容器需要提前开辟空间。

#### 23.6.1 set_intersection

**作用**：求两个容器的交集，返回交集最后一个元素的迭代器。

**函数原型**：`set_intersection(iterator beg1, iterator end1, iterator beg2, iterator end2, iterator dest);`

> 注意：目标容器取两个容器中**较小**的容量。

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

void test01()
{
	vector<int> v1;
	vector<int> v2;
	for (int i = 0; i < 10; i++)
	{
		v1.push_back(i);
		v2.push_back(i + 5);
	}

	vector<int> vTarget;
	//取两个容器中较小的容量
	vTarget.resize(min(v1.size(), v2.size()));

	vector<int>::iterator itEnd = set_intersection(v1.begin(), v1.end(), v2.begin(), v2.end(), vTarget.begin());

	for (vector<int>::iterator it = vTarget.begin(); it != itEnd; it++)
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

#### 23.6.2 set_union

**作用**：求两个容器的并集。

**函数原型**：`set_union(iterator beg1, iterator end1, iterator beg2, iterator end2, iterator dest);`

> 注意：目标容器取两个容器容量**之和**。

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

void test01()
{
	vector<int> v1;
	vector<int> v2;
	for (int i = 0; i < 10; i++)
	{
		v1.push_back(i);
		v2.push_back(i + 5);
	}

	vector<int> vTarget;
	//并集:目标容器大小为两个容器之和
	vTarget.resize(v1.size() + v2.size());

	vector<int>::iterator itEnd = set_union(v1.begin(), v1.end(), v2.begin(), v2.end(), vTarget.begin());

	for (vector<int>::iterator it = vTarget.begin(); it != itEnd; it++)
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

#### 23.6.3 set_difference

**作用**：求两个容器的差集，即存在于第一个容器而不存在于第二个容器的元素。

**函数原型**：`set_difference(iterator beg1, iterator end1, iterator beg2, iterator end2, iterator dest);`

> 注意：差集有方向性，v1 与 v2 的差 和 v2 与 v1 的差是不同的；目标容器取两个容器中**较大**的容量。

**示例**：

```c++
#include <iostream>
using namespace std;
#include <vector>
#include <algorithm>

void test01()
{
	vector<int> v1;
	vector<int> v2;
	for (int i = 0; i < 10; i++)
	{
		v1.push_back(i);
		v2.push_back(i + 5);
	}

	//v1 与 v2 的差
	vector<int> vTarget;
	vTarget.resize(max(v1.size(), v2.size()));

	vector<int>::iterator itEnd = set_difference(v1.begin(), v1.end(), v2.begin(), v2.end(), vTarget.begin());
	for (vector<int>::iterator it = vTarget.begin(); it != itEnd; it++)
	{
		cout << *it << " ";
	}
	cout << endl;

	//v2 与 v1 的差
	itEnd = set_difference(v2.begin(), v2.end(), v1.begin(), v1.end(), vTarget.begin());
	for (vector<int>::iterator it = vTarget.begin(); it != itEnd; it++)
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

**C++提高篇结束**
