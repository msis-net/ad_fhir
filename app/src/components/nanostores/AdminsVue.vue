<script>
import { useStore } from '@nanostores/vue';

import { admins } from '@store/admin';
import { counter, increaseCounter, decreaseCounter } from '@store/counter';

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
		<h3>Vue</h3>
		<ul>
			<li v-for="admin in list" :key="admin.id">
				{{ JSON.stringify(admin, null, 2) }}<button @click="addUser({id: admin.id+3,name: 'Another Admin',age: 46,isAdmin: true})">+</button>
			</li>
		</ul>
		<div>
			Counter:{{ count.value }}
			<button @click="decreaseCounter">-1</button>
			<button @click="increaseCounter">+1</button>
		</div>
		<hr>
	</div>
</template>


