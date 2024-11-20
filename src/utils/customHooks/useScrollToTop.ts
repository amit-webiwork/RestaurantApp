import { useEffect } from 'react';
import { ScrollView } from 'react-native';

export function useScrollToTop(id: number, scrollViewRef: React.RefObject<ScrollView>) {
    useEffect(() => {
        if (scrollViewRef?.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    }, [id]);
}