import { http } from "./http";

export async function paymentSimulation(courseId: string) {
  try {
    let res = await http.post(`/payments/initiate`, {
      courseId: courseId,
      provider: "MOCK",
    });
    console.log(res.data);
    const randomString = Math.random().toString(36).substring(2, 9);
    let done = await http.post(`/payments/${res.data.paymentId}/success`, {
      providerRef: randomString,
    });
    console.log(done.data);
  } catch (err) {
    alert(err);
  }
}
