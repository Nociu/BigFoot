from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser
from django.contrib.auth.forms import AuthenticationForm

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'email', 'password1', 'password2')


class LoginForm(AuthenticationForm):
    username = forms.EmailField(label='Correo electrónico')
    password = forms.CharField(widget=forms.PasswordInput)

