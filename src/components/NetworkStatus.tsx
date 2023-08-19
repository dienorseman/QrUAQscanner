import { Text } from "react-native"
import { useAppSelector } from '../store/store';


interface Props {
    connected: boolean
}

export const NetworkStatus = ( ) => {
  const online = useAppSelector(state => state.qr.online);
  return (
      <Text>
        Network status: {online ? <Text style={{ color: 'green' }}>Online</Text> : <Text style={{ color: 'red' }}>Offline</Text>}
      </Text>
  )
}
