import './Login.css';
import useForm from './useForm';

export default function Login(props) {
  const { setUserName } = props;

  const [formData, setFormData] = useForm({
    userName: '',
    password: ''
  })

  async function login(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);

      setUserName(formData.userName);

    } catch (e) {
      console.error(e);
    }


  }

  return (
    <form id="login" onSubmit={login}>
      <label>name:
        <input name="userName" required value={formData.userName} onChange={setFormData} />
      </label>

      <label>password:
        <input type="password" name="password" required value={formData.password} onChange={setFormData} />
      </label>

      <button>login</button>

      <button type="button">register</button>
    </form>
  )
}
