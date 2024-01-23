import { computed } from 'nanostores';

import { users } from '@store/users';

const admins = computed(users, (list) => list.filter((user) => user.isAdmin));

export { admins };
