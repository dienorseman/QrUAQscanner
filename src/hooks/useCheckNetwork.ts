import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { switchOnline } from '../store/qr/qrSlice';
import { useAppDispatch } from '../store/store';

export const useCheckNetwork = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hanldeNetworkChange = NetInfo.addEventListener((state) =>
      state.isConnected !== null
        ? dispatch(switchOnline(state.isConnected))
        : undefined
    );
    return () => hanldeNetworkChange();
  }, []);
};
