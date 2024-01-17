import { useStore } from '@nanostores/react'
import { count } from '@store/profile'


const $count = useStore(count)

console.log($count)
