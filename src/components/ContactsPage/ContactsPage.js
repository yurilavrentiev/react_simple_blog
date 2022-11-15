import { Link } from "react-router-dom";
import './ContactsPage.css';

const ContactsPage = () => {
  return (
    <div className="contacts">
      <h2>Contacts</h2>
      <h3>Author: Lavrentiev Yurii</h3>
      <div>Phone: +380666666666</div>
      <div>Email: yuri.lavrentiev.js@gmail.com</div>
      <div><Link to='https://www.facebook.com/yuri.lavrentiev'>Facebook</Link></div>
      <div><Link to='https://instagram.com/mryurigagarin?igshid=YmMyMTA2M2Y='>Instagram</Link></div>
      <div><Link to='https://github.com/yurilavrentiev'>GitHub</Link></div>
      <div><Link to='https://youtube.com/channel/UC9o65Evuy91LSP-Ir8gi9cw'>YouTube</Link></div>
    </div>
  )
}

export default ContactsPage;