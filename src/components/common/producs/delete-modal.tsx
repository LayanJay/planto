import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import ButtonBase from '../buttons/button-base';

type Props = {
  onDelete: () => void;
  onCancel: () => void;
};

const DeleteProductModal = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(true);

  const handleClose = () => {
    setModalVisible(false);
    props.onCancel();
  };

  const handleDelete = () => {
    setModalVisible(false);
    props.onDelete();
  };

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Are you sure you want delete this product?</Text>

          <View className='flex flex-row' style={{ gap: 5 }}>
            <ButtonBase
              variant={'custom'}
              size='small'
              buttonClassName='bg-red/70 flex items-center justify-center'
              onPress={handleDelete}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </ButtonBase>

            <ButtonBase
              variant={'custom'}
              size='small'
              buttonClassName='bg-black/90 flex items-center justify-center'
              onPress={handleClose}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </ButtonBase>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    width: 300,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default DeleteProductModal;
