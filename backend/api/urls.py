from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', TokenView.as_view(), name='token_obtain_pair'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('edit_user/<int:user_id>/', user_edit.as_view(), name='user_edit'),
    path('delete_user/<int:user_id>/', user_delete.as_view(), name='delete_user'),
    path('user_details/<int:user_id>/', UserDetailsView.as_view(), name='user_details'),
    path('user_logout/<int:user_id>/', user_logout, name='user_logout'),
]   

