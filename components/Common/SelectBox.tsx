import React, { FC, ReactElement, useRef, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    Modal,
    View,
    Pressable,
} from 'react-native';
import styels from '../../styles/Input'
import common from '../../styles/common'
import ModalWrapper from './ModalWrapper';
interface Props {
    label: string
    placeholder: string;
    data: Array<{ label: string; value: string }>;
    onSelect: (item: { label: string; value: string }) => void;
    hasError?: boolean | undefined | any,
    error?: string

}

const Dropdown: FC<Props> = ({ label, placeholder, data, onSelect, hasError, error }) => {
    const DropdownButton: any = useRef();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(undefined);

    const toggleDropdown = (): void => {
        openDropdown();
    };

    const openDropdown = (): void => {

        setVisible(true);
    };

    const onItemPress = (item: any): void => {
        setSelected(item);
        onSelect(item);
        setVisible(false);
    };

    const renderItem = ({ item }: any): ReactElement<any, any> => (
        <Pressable style={styles.item} onPress={() => {
            onItemPress(item)
        }}>
            <Text>{item.label}</Text>
        </Pressable>
    );
    const renderDropdown = (): ReactElement<any, any> => {
        return (
            <ModalWrapper close={() => setVisible(false)} open={visible} animationType="fade">
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </ModalWrapper >
        );
    };

    return (
        <Pressable
            ref={DropdownButton}
            style={styels.inputContainer}
            onPress={toggleDropdown}
        >
            <View>

                <Text style={styels.label}>
                    {label}
                </Text>
                {renderDropdown()}
                <View style={[styels.input, common.shadow]}>
                    <Text style={styles.placeholder(selected)}>
                        {(!!selected && selected.label) || placeholder}
                    </Text>
                </View>
                {hasError &&
                    <Text style={styles.error}>{error}</Text>
                }
                {/* <Icon style={styles.icon} type="font-awesome" name="chevron-down" /> */}
            </View>

        </Pressable>
    );
};

const styles = StyleSheet.create({
    placeholder: (selected: any) => {
        const color = !!selected ? '#000' : '#ccc'
        return {
            color: color,
            flex: 1,
            marginTop: 12
        }
    },
    icon: {
        marginRight: 10,
    },
    list: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: '90%',
        left: '5%',
        shadowColor: '#000000',
        shadowRadius: 4,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.5,
        borderRadius: 10,
        overflow: 'hidden',
        zIndex: 99999

    },
    overlay: {
        width: '100%',
        height: '100%',
        backgroundColor: '#3333332a',
        position: "relative"
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'

    },
    error: {
        color: '#ff0400',
        fontSize: 12,
        marginTop: 3,
        marginLeft: 15,
    }
});

export default Dropdown;