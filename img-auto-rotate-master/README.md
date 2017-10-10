# img-auto-rotate
## 图片自动旋转

随着智能手机的普及，大家已经习惯随手拍点照片传网上了。有时候传上去的照片方向会不对，甚至还有脑袋朝下的情况。为此，各大微博不约而同的给照片增加左右旋转的功能。这样能解决问题，但我们是否能更进一步，自动选择正确的照片方向呢？刚好最近我们有类似的场景，本文就讨论下这个问题。

实际上，数码设备拍摄照片时，会把许多属性附加在照片文件里，这些属性构成了大家常说的 Exif 信息。访问我的相册会发现照片下也有对应的 Exif 信息。Exif 中有个 Orientation 字段，用来存放照片方向，这就是我们需要的，看下它的定义：

<table border="0">
<tbody>
<tr><th>EXIF Orientation Value</th><th>Row #0 is:</th><th>Column #0 is:</th></tr>
<tr>
<td>1</td>
<td>Top</td>
<td>Left side</td>
</tr>
<tr>
<td>2<em></em></td>
<td>Top</td>
<td>Right side</td>
</tr>
<tr>
<td>3</td>
<td>Bottom</td>
<td>Right side</td>
</tr>
<tr>
<td>4</td>
<td>Bottom</td>
<td>Left side</td>
</tr>
<tr>
<td>5<em></em></td>
<td>Left side</td>
<td>Top</td>
</tr>
<tr>
<td>6</td>
<td>Right side</td>
<td>Top</td>
</tr>
<tr>
<td>7</td>
<td>Right side</td>
<td>Bottom</td>
</tr>
<tr>
<td>8</td>
<td>Left side</td>
<td>Bottom</td>
</tr>
</tbody>
</table>

当然，Exif 中的 Orientation 属性，取决于拍照的设备是否拥有方向传感器。不过根据我的了解，目前大部分数码拍照设备都支持记录方向。1 是默认值，2、4、5、7 表示照片进行了翻转。一般情况下，取值应该是 1、3、6、8 中的一种。下面有张更形象的图描述了具体的旋转策略：<br>

![Alt tip](https://st.imququ.com/static/uploads/2012/02/m_orient_flag2.gif)




> ### 转：https://imququ.com/post/how-to-auto-rotate-photo-in-js.html

