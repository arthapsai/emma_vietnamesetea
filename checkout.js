'use strict';
(() => {
const form=document.querySelector('#checkout-form');
if(!form)return;
const review=document.querySelector('#checkout-review');
const fields={name:document.querySelector('#buyer-name'),phone:document.querySelector('#buyer-phone'),address:document.querySelector('#buyer-address')};
const methodNames={cod:'Cash on delivery (COD)',bank:'Internet Banking',momo:'MoMo'};
const methodNotes={cod:'Payment is collected when your order is delivered.',bank:'Bank transfer instructions will be available when online ordering launches. Please do not transfer money yet.',momo:'MoMo payment will be available when the payment service is connected. No wallet charge is made here.'};
let lastSelection;
function selectedItems(){return bag.filter(item=>item.selected!==false&&products[item.id]);}
function renderSummary(){
 const selected=selectedItems(),signature=JSON.stringify(selected);
 if(signature===lastSelection)return;
 lastSelection=signature;
 const items=document.querySelector('#checkout-items');items.replaceChildren();
 for(const item of selected){
  const p=products[item.id],row=document.createElement('article');row.className='checkout-item';
  const picture=document.createElement('div');picture.className='checkout-item-picture';
  const image=document.createElement('img');image.src='assets/'+p.image;image.alt=p.name;picture.append(image);
  const copy=document.createElement('div');copy.className='checkout-item-copy';
  const title=document.createElement('h3');title.textContent=p.name;
  const detail=document.createElement('p');detail.textContent=p.weight;
  const quantity=document.createElement('p');const label=document.createElement('span');label.textContent='Quantity';quantity.append(label,document.createTextNode(': '+item.qty));
  copy.append(title,detail,quantity);
  const price=document.createElement('p');price.className='checkout-item-price mono';price.textContent=money(p.price*item.qty);row.append(picture,copy,price);items.append(row);
 }
 if(!selected.length){
  const empty=document.createElement('div');empty.className='checkout-empty';
  const title=document.createElement('h3');title.textContent='Your tea selection is empty.';
  const text=document.createElement('p');text.textContent='Choose a tea from the collection to continue.';
  const link=document.createElement('a');link.href='shop.html';link.textContent='Browse teas →';empty.append(title,text,link);items.append(empty);
 }
 const total=selected.reduce((n,item)=>n+products[item.id].price*item.qty,0);
 document.querySelector('#checkout-subtotal').textContent=money(total);
 document.querySelector('#checkout-total').textContent=money(total);
 document.querySelector('#checkout-submit').disabled=!selected.length;
 if(!selected.length){review.hidden=true;form.hidden=false;}
}
function setError(key,message){const field=fields[key];document.querySelector('#'+key+'-error').textContent=message;field.setAttribute('aria-invalid',String(Boolean(message)));}
Object.entries(fields).forEach(([key,field])=>field.addEventListener('input',()=>{setError(key,'');document.querySelector('#checkout-form-status').textContent='';}));
form.addEventListener('change',event=>{if(event.target.name==='payment')document.querySelector('#payment-detail').textContent=methodNotes[event.target.value];});
form.addEventListener('submit',event=>{
 event.preventDefault();
 const errors={name:fields.name.value.trim().length<2?'Please enter your full name.':'',phone:/^\+?[0-9\s().-]+$/.test(fields.phone.value.trim())&&fields.phone.value.replace(/\D/g,'').length>=9&&fields.phone.value.replace(/\D/g,'').length<=15?'':'Please enter a valid phone number.',address:fields.address.value.trim().length<10?'Please enter your full delivery address.':''};
 Object.entries(errors).forEach(([key,message])=>setError(key,message));
 const firstInvalid=Object.keys(errors).find(key=>errors[key]);
 if(firstInvalid){document.querySelector('#checkout-form-status').textContent='Please check the highlighted fields.';fields[firstInvalid].focus();return;}
 if(!selectedItems().length){document.querySelector('#checkout-form-status').textContent='You have no selected items to review.';renderSummary();return;}
 const payment=new FormData(form).get('payment');
 if(!methodNames[payment]){document.querySelector('#checkout-form-status').textContent='Please choose a payment method.';return;}
 // Buyer details stay in these form fields and review nodes. No storage or network submission.
 for(const [key,field] of Object.entries(fields))document.querySelector('#review-'+key).textContent=field.value.trim();
 document.querySelector('#review-payment').textContent=methodNames[payment];
 form.hidden=true;review.hidden=false;window.emmaI18n?.apply();
 document.querySelector('#review-title').focus({preventScroll:true});review.scrollIntoView({behavior:'smooth',block:'start'});
});
document.querySelector('#edit-checkout').addEventListener('click',()=>{review.hidden=true;form.hidden=false;fields.name.focus({preventScroll:true});form.scrollIntoView({behavior:'smooth',block:'start'});});
document.addEventListener('click',()=>queueMicrotask(renderSummary));
renderSummary();
})();
