<template>
  <div class="input-section">
    <input type="text" v-model="inputValue" placeholder="enter text" class="text-input" />
    <button @click="fetchUserData">Search</button>
  </div>
  <div class="content-wrapper">
    <div class="item">
      <div v-if="userData">
        <h2>{{ userData.login }}</h2>
        <img :src="userData.avatar_url" alt="Avatar" width="180">
        <p>Name: {{ userData.name || 'Not available' }}</p>
        <p>Bio: {{ userData.bio || 'Not available' }}</p>
        <p>Blog: {{ userData.blog || 'Not available' }}</p>
        <p>X username: {{ userData.twitter_username || 'Not available' }}</p>
        <p>Location: {{ userData.location || 'Not available' }}</p>
        <p>Followers: {{ userData.followers }}</p>
        <p>Following: {{ userData.following }}</p>
        <p>Repositories: {{ userData.public_repos }}</p>
        <a :href="userData.html_url" target="_blank">GitHub Profile</a>
      </div>
    </div>
    <!-- <div v-if="displayValue">{{ displayValue }}</div> -->
    
    <div v-if="repositories.length" class="item">
      <h2>Repositories</h2>
      <div v-for="repository in repositories">
        <p>{{ repository.name }}</p>
        <a :href="repository.html_url" target="_blank">Link to profile</a>
      </div>
    </div>
    <div v-if="followers.length" class="item">
      <h2>Followers</h2>
      <div v-for="follower in followers">
        <div class="profile-section">
          <div>
            <img :src="follower.avatar_url" width="60" />
          </div>
          <div>
            <p @click="seeThisProfile(follower.login)" class="log">{{ follower.login }}</p>
            <a :href="follower.html_url" target="_blank">GitHub Profile</a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="following.length" class="item">
      <h2>Following</h2>
      <div v-for="profile in following">
        <div class="profile-section">
          <div>
            <img :src="profile.avatar_url" width="60" />
          </div>
          <div>
            <p @click="seeThisProfile(follower.login)" class="log">{{ profile.login }}</p>
            <a :href="profile.html_url" target="_blank">GitHub Profile</a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
    <div v-if="loading">Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const inputValue = ref("")
const displayValue = ref("")
const userData = ref(null)
const loading = ref(false)
const repositories = ref([])
const followers = ref([])
const following = ref([])
const error = ref(null)

const showValue = () => {
  console.log(displayValue)
  displayValue.value = inputValue.value
}

const fetchUserData = async () => {
  loading.value = true
  userData.value = null
  error.value = null

  try {
    const response = await fetch(`https://api.github.com/users/${inputValue.value}`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `HTTP error! status ${response.status}`);
    }
    userData.value = await response.json()

    await Promise.all([
      fetchList(`https://api.github.com/users/${inputValue.value}/repos?per_page=8`, repositories),
      fetchList(`https://api.github.com/users/${inputValue.value}/followers?per_page=8`, followers),
      fetchList(`https://api.github.com/users/${inputValue.value}/following?per_page=8`, following)
    ]);
  } catch (err) {
    error.value = err.message
    console.error("Error fetching user data:", err.message)
  } finally {
    loading.value = false
  }
}

const fetchList = async (url, list) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      const errorData = await response.json()
    }
    list.value = await response.json()
  } catch (err) {
    list.value = []
  }
}

const seeThisProfile = (login: string) => {
  inputValue.value = login
  fetchUserData()
}
</script>


<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: row;
  gap: 40px;
}
.item {
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 360px;
}
.profile-section {
  display: flex;
  gap: 20px;
}
.input-section {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.text-input {
  padding: 8px 20px;
  border-radius: 4px;
  background: transparent;
  border: 1px solid #dfdfdf;
  font-size: inherit;
}
img {
  border-radius: 50%;
}
.log {
  cursor: pointer;
  font-weight: 600;
}
</style>