var trade_of = function(select){
  $('.cd-dropdown').replaceWith(select);
  $(dropdown).dropdown(opt);
  setTimeout(function(){$('.cd-dropdown span:first').trigger('mousedown.dropdown')},250);
  $('ul').on('opened.click.dropdown');
};
var retrive_from =  function(e){
  ( e.value ==  'from_contacts' ) ?  Gcontacts.groups() : Gcontacts.contacts_by_group(e.value);
};
var retrive_groups = function(e){
  $('.cd-dropdown span:first').off('click');
  Gcontacts.groups();
};
var go_back_from_contacts = function(e){
  Gcontacts.contacts_by_group(window._reference.id);

}
var retrive_contact_info = function(e){
  switch(e.value){

    case ( /^http:/ ).test(e.value) :
      Gcontacts.contact_by_group(e.value);
      break;

    case 'from_contacts':
      Gcontacts.groups();
      break;
    default:
      var addresses = e.value.split(' ');
      var select = create_element();
      var title = $(e.target).find('span:first').text();
      select.options.add(new Option(title, -1));
      console.log(addresses.length)
      if( addresses.length < 2 && addresses[0] == 'empty' )
        select.options.add(new Option('no info about him/her yet', -2));
      else
        for(var i = 0,content; content = addresses[i];i++)
      select.options.add(new Option(content, i))

      select.options.add(new Option('go back!', window._reference.id));
      trade_of(select);
      $('ul').on('opened.click.dropdown', go_back_from_contacts);
      break;
  }
  }
var replace_contacts = function(e){
  console.log('replace_contacts')
  var title = window._reference ? window._reference.title : $('.cd-dropdown span:first').text();
  var data = e.data;
  var select = create_element();
  select.options.add(new Option(title, -1));
  window._reference ={id: e.reference, title: title}
  for(var i = 0,label; label = data[i];i++)
    {
      var emails = [];
      if( typeof( label.email ) !== 'string' )
        for(var j = 0, email; email = label.email[j]; j++)
          emails.push(email.address);
      select.options.add(new Option(label.name, ( emails.length > 0 ) ? emails.join(' ') : 'empty'));
    }
  select.options.add(new Option('back','from_contacts'))
  trade_of(select);
  $('ul').on('opened.click.dropdown', retrive_contact_info);
};
var replace_groups = function(e){
  console.log('replace_groups')
  var data = e.data;
  var select = create_element();
  select.options.add(new Option(e.title, -1));
  for(var i = 0,label; label = data[i];i++)
    select.options.add(new Option(label.name,label.id));
  trade_of(select);
  $('ul').on('opened.click.dropdown', retrive_from);
};
var create_element = function(){
  var select = document.createElement('select');
  select.id = 'dropdown';
  return select;
}
