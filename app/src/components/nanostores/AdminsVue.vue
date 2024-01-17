<script>
import { useStore } from '@nanostores/vue';


import { admins } from '@store/admin';
import { counter, increaseCounter, decreaseCounter } from '@store/counter.js';

import { users, addUser } from '@store/users';

export default {
	setup() {
		const list = useStore(admins);
		const count = useStore(counter);

		return { list, count, increaseCounter, decreaseCounter, addUser};
	},
};

</script>

<template>
	<div>
		<h1>Vue</h1>
		<ul>
			<li v-for="admin in list" :key="admin.id">
				{{ JSON.stringify(admin, null, 2) }}<button @click="addUser({id: admin.id+3,name: 'Another Admin',age: 46,isAdmin: true})">+</button>
			</li>
		</ul>
		<div>
			<h3>Counter</h3>
			<p>{{ count.value }}</p>
			<button @click="decreaseCounter">-1</button>
			<button @click="increaseCounter">+1</button>
		</div>
		<br />
	</div>
</template>


