import { Image, TouchableOpacity, View, Text, FlatList } from 'react-native'

import { styles } from './styles'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'
import { FilterStatus } from '@/types/FilterStatus'
import { Item } from '@/components/Item'

const LISTA: FilterStatus[] = [
    FilterStatus.PENDING,
    FilterStatus.DONE,
]

const ITEMS = [
    {
        id: '1',
        status: FilterStatus.DONE,
        description: 'Leite'
    },
    {
        id: '2',
        status: FilterStatus.DONE,
        description: 'Pão'
    },
    {
        id: '3',
        status: FilterStatus.PENDING,
        description: 'Ovos'
    
    },
    {
        id: '4',
        status: FilterStatus.DONE,
        description: 'Queijo'
    },
    {
        id: '5',
        status: FilterStatus.PENDING,
        description: 'Carne'
    },
    {
        id: '6',
        status: FilterStatus.PENDING,
        description: 'Manteiga'
    },
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

                <FlatList
                    data={ITEMS}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Item
                            data={item}
                            onStatus={() => undefined}
                            onRemove={() => undefined}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui.</Text>}
                />
            
            </View>
        </View>
    )
}