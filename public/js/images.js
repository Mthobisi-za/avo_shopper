var list = ['https://media.istockphoto.com/photos/two-slices-of-avocado-picture-id856586464?k=20&m=856586464&s=612x612&w=0&h=-i2bMYnTUuQnK5Q4WaDOkggVfazymU3ZdN79JfL7mMI=', 'https://thumbs.dreamstime.com/b/avocado-fruit-detail-interior-seed-very-healthy-delicious-75206239.jpg', 'https://media.istockphoto.com/photos/fruit-avocado-isolated-on-white-background-picture-id510015094?k=20&m=510015094&s=612x612&w=0&h=gY7feIX4VQBzkBpxStDfRdHvsCQuDf9g-mbx5BI_rFo=', 'https://southafrica.co.za/images/avocados-chris-wessels-photography-9-786x524.jpg'];
var elements = document.querySelector('.img');
elements.forEach(elem => {
    var vl = Math.floor(Math.random() * list.length);
    elem.src = vl;
})
console.log(elements)