import { Image, TouchableOpacity, View, Text } from 'react-native'

import { styles } from './styles'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'
import { FilterStatus } from '@/types/FilterStatus'

const LISTA: FilterStatus[] = [
    FilterStatus.PENDING,
    FilterStatus.DONE,
]

export function Home() {
    return (
        <View style={styles.container}>
            <Image source={require('@/assets/logo.png')} style={styles.logo} />

            <View style={styles.form}>
                <Input placeholder='O que você precisa comprar?' />
                <Button title='Adicionar' onPress={() => undefined} />
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    {LISTA.map((status, _index) => (
                            <Filter key={_index} status={status} isActive={status === FilterStatus.PENDING} />
                    ))}

                    <TouchableOpacity style={styles.clearButton}>
                        <Text style={styles.clearText}>Limpar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}