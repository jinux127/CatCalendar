const API_END_POINT = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

export const request = async (nodeId) => {
  try {
    const res = await fetch(`${API_END_POINT}/${nodeId ? nodeId : ''}`);

    if (!res.ok) {
      throw new Error('서버의 상태가 이상합니다.');
    }

    return await res.json();
  } catch (error) {
    throw new Error(`request api 호출 에러 ${e.message}`);
  }
};
