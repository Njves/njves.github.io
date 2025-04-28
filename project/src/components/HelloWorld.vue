<script setup>
import 'animate.css';
import {ref} from 'vue';

import egor from '@/assets/img.png';
import artem from '@/assets/Artem.jpg';
import daniel from '@/assets/daniel.jpg';
import valera from '@/assets/valera.jpg';
import maks from '@/assets/maks.png';
import alex from '@/assets/alex.png';
import vasya from '@/assets/vasya.jpg';
import gleb from '@/assets/gleb.jpg';
import placeholder from '@/assets/placeholder.png';

import Carousel from 'primevue/carousel';
import Textarea from 'primevue/textarea';


const isBouncing = ref(false);

const friends = ref([
  {img: egor, name: 'Луговкин Егор'},
  {img: artem, name: 'Черкасов Артем'},
  {img: daniel, name: 'Мамонтов Данил'},
  {img: valera, name: 'Васильев Валера'},
  {img: maks, name: 'Стариков Максим'},
  {img: alex, name: 'Стариков Алексей'},
  {img: vasya, name: 'Мальцев Василий'},
  {img: gleb, name: 'Климченко Глеб'},
  {img: placeholder, name: 'Кузнецова Анастасия'},
  {img: placeholder, name: 'Ершов Никита'}
]);

function startBounce() {
  isBouncing.value = true;
  setTimeout(() => {
    isBouncing.value = false;
  }, 1000);
}

const clicked = ref(false);
function sendMail() {
  const firstname = document.getElementById('firstname3').value;
  const lastname = document.getElementById('lastname3').value;
  const drink = document.getElementById('drink').checked ? 'Не будет пить' : '';
  const night = document.getElementById('night').checked ? 'Не будет ночевать' : '';
  const car = document.getElementById('car').checked ? 'Поедет на машине' : '';
  const comment = document.getElementById('comment').value;

  let body = `Имя: ${firstname}\nФамилия: ${lastname}\n${drink}\n${night}\n${car}\n\nКомментарий:\n${comment}`;

  body = encodeURIComponent(body);

  const subject = encodeURIComponent('Ответ на форму');

  window.location.href = `mailto:mrpostik@gmail.com?subject=${subject}&body=${body}`;
}
function showImage() {
  if (!clicked.value) {
    const overlay = document.getElementById('imageOverlay');
    overlay.style.display = 'flex'; // Показать оверлей

    // Через 2 секунды скрыть
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 2000);
    clicked.value = true;
  }
}

</script>

<template>
  <div id="imageOverlay" style="display: none; position: fixed; top: 0; left: 0;
    width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.8);
   align-items: center; justify-content: center; z-index: 9999;">
    <img src="https://i.pinimg.com/736x/c4/92/c5/c492c51902e5d421bed888fb72aaacbd.jpg" alt="Картинка"
         style="max-width: 90%; max-height: 90%;">
  </div>
  <div class="flex flex-column">
    <div class="flex flex-column justify-content-center text-center">
      <h1>Привет ребята!</h1>
      <div class="flex justify-content-center">
        <img class="align-content-center" height="200px" width="232px"
             src="https://i.pinimg.com/originals/9f/ef/36/9fef363e52e8153b0a9495241543ffff.gif"
             alt="котик"/>
      </div>
      <h2 class="animate__animated animate__bounce infinite-bounce mt-6">Если вы сейчас на этом сайте<br/>Значит я
        пригласил
        вас!!!<br/>На свой день рождение 17 мая на катике!!!🥳🎉🎊</h2>
      <div class="carousel">
        Тут вы можете посмотреть на всех приглашенных гостей
        <div class="carousel-container">
          <Carousel :value="friends" :numVisible="3" :numScroll="1" circular>
            <template #item="slotProps">
              <div class="friend-card">
                <img height="152px" :src="slotProps.data.img" alt="Фото друга" class="m-2 border-round friend-img"/>
                <p class="friend-name">{{ slotProps.data.name }}</p>
              </div>
            </template>
          </Carousel>
        </div>
      </div>
      <h3>Пока что еще не удалось определиться с местом 😞<br/> Но как только определимся, я
        обязательно напишу!<br/>Стоимость мероприятия 1000₽</h3>
      <h3>Если вы пойдете <a href="https://t.me/+uQl0e8raRkkwZjJi" target="_blank">переходите в беседу💋</a></h3>
      <span>Если ты хочешь позвать кого-то из своих друзей <a href="https://telegram.me/maloy_plakech" target="_blank">напиши мне в личку</a></span>
    </div>
    <div class="grid justify-content-center m-0 p-0">
      <form class="col-6 align-items-center w-fit" id="myForm" action="https://formsubmit.co/mrpostik@gmail.com"  method="POST">
        <p>Заполни форму пж чтобы я мог понять, чо ты хочешь от праздника</p>
        <div class="field grid">
          <label for="firstname3" class="col-fixed" style="width:100px">Имя</label>
          <div class="col">
            <input name="name" id="firstname3" type="text"
                   class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary">
          </div>
        </div>
        <div class="field grid">
          <label for="lastname3" class="col-fixed" style="width:100px">Фамилия</label>
          <div class="col">
            <input name="surname" id="lastname3" type="text" placeholder="Необязательно"
                   class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary">
          </div>
        </div>
        <div class="formgroup-inline">
          <div class="field-checkbox">
            <input name="drink" type="checkbox" id="drink" @click="showImage">
            <label for="drink" @click="showImage">Я не буду пить</label>
          </div>
          <div class="field-checkbox">
            <input name="night" type="checkbox" id="night"></input>
            <label for="night">Я не буду ночевать</label>
          </div>
          <div class="field-checkbox">
            <input name="car" type="checkbox" id="car"></input>
            <label for="car">Я поеду на машине</label>
          </div>
        </div>
        <p>Напиши тут свои предпочтения по алкоголю или какие-то ньюансы</p>
        <div class="card flex justify-center">
          <Textarea name="comment" placeholder="Напиши отдельные мысли и предпочтения" rows="5" cols="30"/>
        </div>
        <button type="submit"
                class="mt-2 bg-primary border-primary-500 px-3 py-2 text-base border-1 border-solid border-round cursor-pointer transition-all transition-duration-200 hover:bg-primary-600 hover:border-primary-600 active:bg-primary-700 active:border-primary-700">
          Отправить!
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.infinite-bounce {
  animation-iteration-count: infinite;
  animation-duration: 2s; /* скорость прыжков */
}

body {
  text-align: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
}
.friend-card img {
  transform: translateZ(0);
  will-change: transform;
}
img {
  display: block;
  width: 100%;
  height: auto;
  margin: auto;
}
@media (min-width: 1200px) {
  img {
    max-width: 600px; /* Например, максимум 600px на очень широких экранах */
  }
}
</style>
